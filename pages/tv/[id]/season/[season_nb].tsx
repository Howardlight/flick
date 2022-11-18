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
import Star from "../../../../assets/Star.svg";


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
                        {data.air_date ? <p className="font-medium text-neutral-400">{moment(data.air_date).format("LL")}</p> : <Fragment />}
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
//TODO: Create Layouts
//TODO: Add case for when it is unknown when an episode will air
const Episode = ({ ep }: { ep: Episode }) => {
    return (
        <div className="mt-4 mb-4 flex flex-col mr-2 bg-neutral-900 rounded-sm p-3">
            <div className={ep.air_date && !isReleased(ep.air_date) ? "mb-2" : ""}>
                <p className="font-medium">{`Episode ${ep.episode_number} - ${ep.name}`}</p>
                {
                    ep.air_date && !isReleased(ep.air_date) ?
                        <p className="text-neutral-400 font-medium">{`Aired on ${moment(ep.air_date).format("LL")}`}</p>
                        : <p className="text-neutral-400 font-medium">{`To Be Released on ${moment(ep.air_date).format("LL")}`}</p>
                }

            </div>

            <p className="text-neutral-400 text-sm mb-6">{ep.overview}</p>
            {
                !isReleased(ep.air_date) && ep.vote_count != 0 ?
                    <div className="flex flex-row justify-end items-center gap-2">
                        <p className="inline text-base font-medium">{Math.round(ep.vote_average * 10) / 10}</p>
                        <Image className="inline" src={Star.src} width={24} height={24} alt={"Stars"} />
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