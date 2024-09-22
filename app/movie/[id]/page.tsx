import { Metadata } from "next";
import { Fragment } from "react";
import { Movie, Video } from "../../../types/Movie";
import { CastWidget, } from "../../../components/Movie-TV/CastWidget";
import { Overview } from "../../../components/Movie-TV/Overview";
import MovieDetailsBox from "../../../components/DetailsBox/MovieDetailsBox";
import NotFound from "../../not-found";
import { Images } from "../../../components/Movie-TV/Images/ImagesWidget";
import MediaType from "../../../types/MediaType";
import ReviewsWidget from "../../../components/Reviews/ReviewsWidget";
import Recommendations from "../../../components/Recommendations/Recommendations";
import constants from "../../../utils/constants";
import MediaDetailsHero from "../../../components/Organisms/MediaDetailsHero/MediaDetailsHero";

interface MoviePageParams {
    id: string;
}

export async function generateMetadata({ params }: { params: MoviePageParams }): Promise<Metadata> {
    const { data } = await getData(params.id);
    return { title: `${data.title} - Flick` };
}

async function getData(id: string) {
    const request = await fetch(
        `${constants.baseAPI}movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
        {
            next: { revalidate: constants.cacheRevalidation.mediaDetails }
        }
    );

    const videosRequest = await fetch(
        `${constants.baseAPI}movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
        {
            next: { revalidate: constants.cacheRevalidation.mediaDetails }
        }
    );
    const data: Movie = await request.json();
    const { results: videosData } = await videosRequest.json();


    return {
        data: data,
        videos: videosData as Video[],
        mediaType: "Movie",
        requestStatus: request.status,
    };
}

//TODO: Add case for when The movie is not released yet
export default async function MoviePage({ params }: { params: MoviePageParams }) {
    const { data, videos, requestStatus, mediaType } = await getData(params.id);
    if (requestStatus != 200) return <NotFound />;
    return (
        <Fragment>
            <MediaDetailsHero data={data} videos={videos} />
            <div className="m-3">
                <MovieDetailsBox data={data} />
                <Overview overview={data.overview} />
                <br />

                <CastWidget mediaType={mediaType} ID={params.id} />
                <Images id={data.id} mediaType={MediaType.movie} />

                <Recommendations id={data.id} mediaType={MediaType.movie} />
                {data.vote_count > 1 ?
                    <ReviewsWidget ID={data.id} mediaType={MediaType.movie} />
                    : <Fragment />
                }
            </div>
        </Fragment>
    );
}