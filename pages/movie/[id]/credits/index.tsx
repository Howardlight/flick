import { Tab } from "@headlessui/react";
import { GetServerSidePropsContext } from "next";
import React, { Fragment } from "react";
import { Navbar } from "../../../../components/Navbar";
import { CreditsResponse } from "../../../../types/GetCreditsTypes";
import { MovieCreditsCastWidget } from "../../../../components/movie/credits/MovieCreditsCastWidget";
import { MovieCreditsCrewWidget } from "../../../../components/movie/credits/MovieCreditsCrewWidget";
import { Page404 } from "../../../Page404";

const MovieCredits = ({ data, requestStatus }: { data: CreditsResponse, requestStatus: number }) => {


    // console.log(data);

    if (requestStatus != 200) return <Page404 />;
    return (
        <Fragment>
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

    const request = await fetch(`https://api.themoviedb.org/3/movie/${context.query.id}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    data = await request.json();

    return {
        props: {
            data: data,
            requestStatus: request.status,
        }
    }
}

export default MovieCredits;