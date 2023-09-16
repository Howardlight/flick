import { GetServerSidePropsContext, Metadata, NextPage } from "next";
import { Person } from "../../../types/Person";
import { Navbar } from "../../../components/Navbar";
import React from "react";
import NotFound from "../../not-found";
import HydrationWrapper from "../../../components/HydrationWrapper";
import { PersonPageContent } from "../../../components/Person/PersonPageContent";

interface PersonPageParams {
    id: string;
}

export async function generateMetadata({ params }: { params: PersonPageParams }): Promise<Metadata> {
    const { data } = await getData(params.id);
    return { title: `${data.name} - Flick` }
}

export default async function PersonPage({ params }: { params: PersonPageParams }) {
    const { data, requestStatus, } = await getData(params.id);

    // console.log(data);
    if (requestStatus != 200) return <NotFound />;
    return (
        <HydrationWrapper>
            <Navbar />
            <PersonPageContent data={data} />
        </HydrationWrapper>
    );
}

async function getData(id: string) {
    let data: Person;

    const request = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    data = await request.json();

    return {
        data: data,
        requestStatus: request.status
    }
}