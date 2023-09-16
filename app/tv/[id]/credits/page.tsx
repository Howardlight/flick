import { Tab } from "@headlessui/react";
import { GetServerSidePropsContext, Metadata } from "next";
import React, { Fragment } from "react";
import { Navbar } from "../../../../components/Navbar";
import { CreditsResponse } from "../../../../types/GetCreditsTypes";
import { CreditsCastWidget } from "../../../../components/Credits/CreditsCastWidget";
import { CreditsCrewWidget } from "../../../../components/Credits/CreditsCrewWidget";
import NotFound from "../../../not-found";
import { TVShow } from "../../../../types/TVShow";
import HydrationWrapper from "../../../../components/HydrationWrapper";
import TVCreditsTab from "../../../../components/Credits/TVCreditsTab";

interface TVCreditsParams {
    id: string;
}



export async function generateMetadata({ params }: { params: TVCreditsParams }): Promise<Metadata> {
    const { TVShowName } = await getData(params.id);
    return { title: `${TVShowName} - Credits` };
}

export default async function TVShowCredits({ params }: { params: TVCreditsParams }) {
    const { data, requestStatus, TVShowName } = await getData(params.id)

    // console.log(data);

    if (requestStatus != 200) return <NotFound />;
    return (
        <HydrationWrapper>
            <Navbar />
            <TVCreditsTab data={data} />
        </HydrationWrapper>
    );
}

async function getData(id: string) {
    let data: CreditsResponse;
    let TVShowData: TVShow;

    const request = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    data = await request.json();
    // console.log(data);

    const TVShowNameRequest = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    TVShowData = await TVShowNameRequest.json();
    // console.log(TVShowData);

    return {
        data: data,
        requestStatus: request.status,
        TVShowName: TVShowData.name ? TVShowData.name : "undefined",
    }
}