import { Tab } from "@headlessui/react";
import { GetServerSidePropsContext } from "next";
import React, { Fragment } from "react";
import { Navbar } from "../../../../components/Navbar";
import { CreditsResponse } from "../../../../types/GetCreditsTypes";
import { MovieCreditsCastWidget } from "../../../../components/Credits/CreditsCastWidget";
import { MovieCreditsCrewWidget } from "../../../../components/Credits/CreditsCrewWidget";
import Custom404 from "../../../404";
import { Movie } from "../../../../types/Movie";
import { NextSeo } from "next-seo";

const MovieCredits = ({ data, requestStatus, movieName }: { data: CreditsResponse, requestStatus: number, movieName: string }) => {


    // console.log(data);

    if (requestStatus != 200) return <Custom404 />;
    return (
        <Fragment>
            <NextSeo
                title={`${movieName} - Credits`}
            />
            <Navbar />
            <Tab.Group>
                <Tab.List className={"flex flex-row justify-around font-bold text-xl md:text-2xl gap-2 mt-4 pb-2"}>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button className={["rounded-sm pt-2 pb-2 grow ml-2 text-neutral-200", selected ? "bg-red-600 hover:bg-red-600" : "bg-inherit hover:bg-neutral-700"].join(" ")}>
                                Cast
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button className={["rounded-sm pt-2 pb-2 grow mr-2 text-neutral-200", selected ? "bg-red-600 hover:bg-red-600" : "bg-inherit hover:bg-neutral-700"].join(" ")}>
                                Crew
                            </button>
                        )}
                    </Tab>
                </Tab.List>
                <Tab.Panels className={"ml-2 mr-2"}>
                    <Tab.Panel>
                        <MovieCreditsCastWidget cast={data.cast} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <MovieCreditsCrewWidget crew={data.crew} />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </Fragment>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let data: CreditsResponse;
    let movieData: Movie;

    const request = await fetch(`https://api.themoviedb.org/3/movie/${context.query.id}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    data = await request.json();
    // console.log(data);

    const MovieNamerequest = await fetch(`https://api.themoviedb.org/3/movie/${context!.params!.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    movieData = await MovieNamerequest.json();

    return {
        props: {
            data: data,
            requestStatus: request.status,
            movieName: movieData.title ? movieData.title : "undefined",
        }
    }
}

export default MovieCredits;