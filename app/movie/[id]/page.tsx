import { Metadata } from "next";
import { Fragment } from "react";
import { Movie } from "../../../types/Movie";
import { Navbar } from "../../../components/Navbar";
import { CastWidget, } from "../../../components/Movie-TV/CastWidget";
import { Overview } from "../../../components/Movie-TV/Overview";
import MovieDetailsBox from "../../../components/DetailsBox/MovieDetailsBox";
import HeroBox from "../../../components/HeroBox/MovieHeroBox";
import NotFound from "../../not-found";
import { Images } from "../../../components/Movie-TV/Images/ImagesWidget";
import MediaType from "../../../types/MediaType";
import ReviewsWidget from "../../../components/Reviews/ReviewsWidget";
import Recommendations from "../../../components/Recommendations/Recommendations";

interface MoviePageParams {
    id: string;
}

export async function generateMetadata({ params }: { params: MoviePageParams }): Promise<Metadata> {
    const { data } = await getData(params.id);
    return { title: `${data.title} - Flick` };
}

async function getData(id: string) {
    const request = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
        {
            cache: "no-cache"
        }
    );
    const data: Movie = await request.json();

    return {
        data: data,
        mediaType: "Movie",
        requestStatus: request.status,
    };
}

//TODO: Add case for when The movie is not released yet
export default async function MoviePage({ params }: { params: MoviePageParams }) {
    const { data, requestStatus, mediaType } = await getData(params.id);

    if (requestStatus != 200) return <NotFound />;
    return (
        <Fragment>
            <div className="lg:border-b-2 border-red-600"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(24, 26, 27, 0.84), rgba(0,0,0, 0.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
                }}>
                <Navbar />

                <HeroBox data={data} />
            </div>
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