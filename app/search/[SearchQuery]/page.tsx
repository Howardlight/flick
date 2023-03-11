"use client";
import { MultiSearchResponse } from "../../../types/MultiSearchTypes";
import moment from "moment";
import { Navbar } from "../../../components/Navbar";
import { useRouter } from "next/navigation";
import useSWR, { SWRResponse } from "swr";
import fetcher from "../../../Fetcher";
import { SearchContent, SearchBox } from "../../../components/Search/SearchBox";
import { useState } from "react";
import HydrationWrapper from "../../../components/HydrationWrapper";

export function isInPast(release_date: Date) { return moment() > moment(release_date); }

interface SearchParams {
    SearchQuery: string;
    Page: string;
}

//TODO: When entering a Query, empty spaces are replaced with %20, fix that
export default function Search({ params }: { params: SearchParams }) {
    //TODO: Add Filtering
    const [page, setPage] = useState(1);
    const { data, error }: SWRResponse<MultiSearchResponse, Error> = useSWR(`/api/Multisearch/${params.SearchQuery}/${page}`, fetcher, { loadingTimeout: 2000 });
    const router = useRouter();

    return (
        <HydrationWrapper>
            <head>
                <title>{`Searched for ${params.SearchQuery} - Flick`}</title>
            </head>
            <div className="flex flex-col">
                <Navbar />
                <SearchBox router={router} prevQuery={params.SearchQuery.replace("%20", " ")} pageLimit={data ? data?.total_pages : 0} setPage={setPage} page={page} />
                <SearchContent data={data} error={error} />
            </div>
        </HydrationWrapper>
    )
}