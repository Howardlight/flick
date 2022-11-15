import { GetServerSidePropsContext } from "next";
import { NextSeo } from "next-seo";
import { Fragment } from "react";
import { Navbar } from "../../../../components/Navbar";
import { Season } from "../../../../types/Season";
import { TVShow } from "../../../../types/TVShow";
import Custom404 from "../../../404";
import Image from "next/image";
import Placeholder from "../../../../assets/MovieSVG.svg";
import { PosterLoader } from "../../../../PosterLoader";
import { Episode } from "../../../../types/Episode";
import moment from "moment";
import { isReleased } from "../../../search/[...query]";

export default function SeasonPage({ data, requestStatus, name }: { data: Season, requestStatus: number, name: string }) {


    console.log(data);

    if (requestStatus != 200) return <Custom404 />;
    return (
        <Fragment>
            <NextSeo
                title={`${name} - Season ${data.season_number}`}
            />
            <main>
                <Navbar />
                <div className="flex flex-row gap-2 p-3">
                    <Image
                        src={data.poster_path ? data.poster_path : Placeholder.src}
                        loader={PosterLoader}
                        alt={`${data.name} Poster`}
                        width={125}
                        height={187}
                        className="rounded-sm w-[125px] h-[187px]"
                    />
                    <div className="grow">
                        <p className="font-semibold text-neutral-100">{name}</p>
                        <p className="font-medium text-neutral-400">{data.name}</p>
                    </div>
                </div>
                <div className="m-3">
                    {
                        data.overview ?
                            <Fragment>
                                <p className="font-semibold text-2xl text-neutral-100 mb-3">Overview</p>
                                <p className="text-neutral-300">{data.overview}</p>
                                <br />
                            </Fragment>
                            : <Fragment />
                    }

                    <Episodes eps={data.episodes} />

                </div>
            </main>

        </Fragment >
    )
}

const Episodes = ({ eps }: { eps: Episode[] }) => {
    console.log(eps);
    return (
        <Fragment>
            {
                eps.map((ep, index) => (<Episode key={`${ep.episode_number}-${ep.id}-${index}`} ep={ep} />))
            }
        </Fragment>

    )
}

//TODO: Add read more for longer overviews
//TODO: Add min width and max width
//TODO: Add Cast involved
const Episode = ({ ep }: { ep: Episode }) => {
    return (
        <div className="mt-4 mb-4 flex flex-col mr-2">
            <div className="mb-2">
                <p className="font-medium">{`Episode ${ep.episode_number} - ${ep.name}`}</p>
                {
                    !isReleased(ep.air_date) ?
                        <p className="text-neutral-400 font-medium">{`Aired on ${moment(ep.air_date).format("LL")}`}</p>
                        : <p className="text-neutral-400 font-medium">{`To be released on ${moment(ep.air_date).format("LL")}`}</p>
                }

            </div>

            <p className="text-neutral-400 text-sm">{ep.overview}</p>
            {
                !isReleased(ep.air_date) ?
                    <div className="flex flex-row justify-end">
                        <p className="font-semibold ">{Math.round(ep.vote_average * 10) / 10}/10</p>
                    </div>
                    : <Fragment />
            }


        </div>
    )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    let data: Season, tvData: TVShow;
    const { id, season_nb } = context.query;

    const tvRequest = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    tvData = await tvRequest.json();

    const request = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${season_nb}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    data = await request.json();


    return {
        props: {
            data: data,
            requestStatus: request.status,
            name: tvData.name
        }
    }
}