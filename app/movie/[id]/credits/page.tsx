import { Metadata } from "next";
import React, { Fragment } from "react";
import Navbar from "../../../../components/Navbar";
import { CreditsResponse } from "../../../../types/GetCreditsTypes";
import NotFound from "../../../not-found";
import { Movie } from "../../../../types/Movie";
import MovieCreditsTabs from "../../../../components/Credits/MovieCreditsTabs";

interface MovieCreditsParams {
    id: string;
}

export async function generateMetadata({ params }: { params: MovieCreditsParams }): Promise<Metadata> {
    const { movieName } = await getData(params.id);
    return { title: `${movieName} - Credits` }
}


export default async function MovieCredits({ params }: { params: MovieCreditsParams }) {
    const { data, requestStatus } = await getData(params.id);

    // console.log(data);

    if (requestStatus != 200) return <NotFound />;
    return (
        <Fragment>
            <Navbar />
            <MovieCreditsTabs data={data} />
        </Fragment>
    );
}

async function getData(id: string) {
    let data: CreditsResponse;
    let movieData: Movie;

    const request = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
        { next: { revalidate: 4147200 } }
    );
    data = await request.json();
    // console.log(data);

    const MovieNamerequest = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
        { next: { revalidate: 4147200 } }
    );
    movieData = await MovieNamerequest.json();

    return {
        data: data,
        requestStatus: request.status,
        movieName: movieData.title ? movieData.title : "undefined",
    }
}