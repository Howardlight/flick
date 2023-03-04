import { Fragment } from "react";
import { Navbar } from "../../../../../components/Navbar";
import { Season } from "../../../../../types/Season";
import { TVShow } from "../../../../../types/TVShow";
import Custom404 from "../../../../404";
import { EpisodeDate, Episodes } from "../../../../../components/Seasons/Episode";
import SeasonsImage from "../../../../../components/Seasons/SeasonsImage";
import HydrationWrapper from "../../../../../components/HydrationWrapper";

interface SeasonsPageParams {
    id: string;
    season_nb: string
}

//TODO: Find a solution for all the Suspense
// Holy shit

export default async function SeasonPage({ params }: { params: SeasonsPageParams }) {
    const { data, requestStatus, name } = await getData(params.id, params.season_nb);

    console.log(data);

    if (requestStatus != 200) return <Custom404 />;
    return (
        <HydrationWrapper>
            <head>
                <title>{`${name} - Season ${data.season_number}`}</title>
            </head>
            <main>
                <Navbar />
                <div className="flex flex-row gap-2 p-3">
                    <SeasonsImage name={data.name} posterPath={data.poster_path} />
                    <div className="grow">
                        <p className="font-semibold text-neutral-100">{name}</p>
                        <EpisodeDate airDate={data.air_date} />
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

        </HydrationWrapper>
    )
}

async function getData(id: string, season_nb: string) {
    let data: Season, tvData: TVShow;

    const tvRequest = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    tvData = await tvRequest.json();

    const request = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${season_nb}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    data = await request.json();


    return {
        data: data,
        requestStatus: request.status,
        name: tvData.name
    }

}