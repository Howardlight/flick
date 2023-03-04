import { Tab } from "@headlessui/react";
import { GetServerSidePropsContext } from "next";
import React, { Fragment } from "react";
import { Navbar } from "../../../../components/Navbar";
import { CreditsResponse } from "../../../../types/GetCreditsTypes";
import { CreditsCastWidget } from "../../../../components/Credits/CreditsCastWidget";
import { CreditsCrewWidget } from "../../../../components/Credits/CreditsCrewWidget";
import Custom404 from "../../../404";
import { Movie } from "../../../../types/Movie";
import { NextSeo } from "next-seo";
import MovieCreditsTabs from "../../../../components/Credits/MovieCreditsTabs";

interface MovieCreditsParams {
    id: string;
}

export async function MovieCredits({ params }: { params: MovieCreditsParams }) {
    const { data, requestStatus, movieName } = await getData(params.id);

    // console.log(data);

    if (requestStatus != 200) return <Custom404 />;
    return (
        <Fragment>
            <head>
                <title>{`${movieName} - Credits`}</title>
            </head>
            <Navbar />
            <MovieCreditsTabs data={data} />
        </Fragment>
    );
}

async function getData(id: string) {
    let data: CreditsResponse;
    let movieData: Movie;

    const request = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    data = await request.json();
    // console.log(data);

    const MovieNamerequest = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    movieData = await MovieNamerequest.json();

    return {
        data: data,
        requestStatus: request.status,
        movieName: movieData.title ? movieData.title : "undefined",
    }
}

export default MovieCredits;