import { Movie } from "../../../types/Movie";
import { Navbar } from "../../../components/Navbar";
import { CastWidget } from "../../../components/Movie-TV/CastWidget";
import Custom404 from "../../404";
import { Fragment } from "react";
import { MovieReviews } from "../../../components/Reviews/MovieReviews";
import { Recommendations } from "../../../components/Recommendations/MovieRecommendations";
import { Images } from "../../../components/Movie-TV/Images/MovieImagesWidget";
import { Overview } from "../../../components/Movie-TV/Overview";
import MovieDetailsBox from "../../../components/DetailsBox/MovieDetailsBox";
import HeroBox from "../../../components/HeroBox/MovieHeroBox";
import HydrationWrapper from "../../../components/HydrationWrapper";
import { Metadata } from "next";

interface MoviePageParams {
    id: string;
}


export async function generateMetadata({ params }: { params: MoviePageParams }): Promise<Metadata> {
    const { data } = await getData(params.id);
    return { title: `${data.title} - Flick` };
}

//TODO: Add case for when The movie is not released yet
export default async function MoviePage({ params }: { params: MoviePageParams }) {
    const { data, requestStatus, mediaType } = await getData(params.id);

    if (requestStatus != 200) return <Custom404 />;
    return (
        <HydrationWrapper>
            <div className="lg:border-b-2 border-red-600" style={{ backgroundImage: `linear-gradient(to right, rgba(24, 26, 27, 0.84), rgba(0,0,0, 0.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path})` }}>
                <Navbar />

                <HeroBox data={data} />
            </div>
            <div className="m-3">

                <MovieDetailsBox data={data} />

                <Overview overview={data.overview} />

                <br />

                <CastWidget id={data.id} mediaType={mediaType} />

                <Images id={data.id} />

                <Recommendations id={data.id} />
                {data.vote_count > 1 ? <MovieReviews movieID={data.id} /> : <Fragment />}
            </div>
        </HydrationWrapper>
    )
}

async function getData(id: string) {
    let data: Movie;


    const request = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
    );
    { cache: "no-cache" }
    data = await request.json();

    return {
        data: data,
        mediaType: "Movie",
        requestStatus: request.status,
    }
}