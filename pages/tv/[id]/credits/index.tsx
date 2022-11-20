import { Tab } from "@headlessui/react";
import { GetServerSidePropsContext } from "next";
import React, { Fragment } from "react";
import { Navbar } from "../../../../components/Navbar";
import { CreditsResponse } from "../../../../types/GetCreditsTypes";
import { MovieCreditsCastWidget } from "../../../../components/movie/credits/MovieCreditsCastWidget";
import { MovieCreditsCrewWidget } from "../../../../components/movie/credits/MovieCreditsCrewWidget";
import Custom404 from "../../../404";
import { Movie } from "../../../../types/Movie";
import { NextSeo } from "next-seo";
import { TVShow } from "../../../../types/TVShow";

const TVShowCredits = ({ data, requestStatus, TVShowName }: { data: CreditsResponse, requestStatus: number, TVShowName: string }) => {


    // console.log(data);

    if (requestStatus != 200) return <Custom404 />;
    return (
        <Fragment>
            <NextSeo
                title={`${TVShowName} - Credits`}
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
    let TVShowData: TVShow;

    const request = await fetch(`https://api.themoviedb.org/3/tv/${context.query.id}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    data = await request.json();
    // console.log(data);

    const TVShowNameRequest = await fetch(`https://api.themoviedb.org/3/tv/${context.query.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    TVShowData = await TVShowNameRequest.json();
    // console.log(TVShowData);

    return {
        props: {
            data: data,
            requestStatus: request.status,
            TVShowName: TVShowData.name ? TVShowData.name : "undefined",
        }
    }
}

export default TVShowCredits;