"use client";

import { Dispatch, Fragment, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { isMovieResult, isPersonResult, isTVShowResult, MultiSearchResponse, Result } from "../../types/MultiSearchTypes";
import { MultiSearchMovieCard, MultiSearchPersonCard, MultiSearchTVShowCard } from "./MultiSearchCards";
import { useRouter } from "next/navigation";
import useSWR, { SWRResponse } from "swr";
import fetcher from "../../utils/Fetcher";
import Navbar from "../Navbar";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function Search({ searchQuery, startPage }: { searchQuery: string, startPage: number }) {
    //TODO: Add Filtering
    const [page, setPage] = useState(startPage);
    const { data, error }: SWRResponse<MultiSearchResponse, Error> = useSWR(`/api/Multisearch/${searchQuery.replaceAll("%20", " ")}/${page}`, fetcher, { loadingTimeout: 2000 });
    const router = useRouter();

    return (
        <Fragment>
            <div className="flex flex-col">
                <Navbar />
                <SearchBox router={router} prevQuery={searchQuery.replaceAll("%20", " ")} pageLimit={data ? data?.total_pages : 0} setPage={setPage} page={page} />
                <SearchContent data={data} error={error} />
            </div>
        </Fragment>
    )
}


export function SearchBox({ router, prevQuery, pageLimit, page, setPage }:
    { router: AppRouterInstance, prevQuery: string, pageLimit: number, page: number, setPage: Dispatch<SetStateAction<number>> }) {
    const [query, setQuery] = useState(prevQuery);

    // Used for the shadow Page changing without messing with the actual Page
    const [localPage, setLocalPage] = useState(page);
    const pageRef: RefObject<HTMLInputElement> = useRef(null);

    //TODO: Optimize the F out of this
    // It is very inefficient

    const handlePageButtons = (e: any) => {
        //checks ID, depending on ID, Updates Page
        if (e.target.id === 'right') setPage(page + 1);
        else if (e.target.id === "left") setPage(page - 1);
        else if (e.target.id === "jump") setPage(localPage);
    }

    const handleOnSearchBtnClick = (e: any) => {
        e.preventDefault();

        if (query === prevQuery) return;
        router.push(`/search/${query}`);
    }

    useEffect(() => {

        //TODO: add DOCS to clarify what's going on
        // checks if reference to the Page input is valid, if so
        // set its content to the current Page AND set LocalPage to Page
        if (!pageRef.current) throw Error("PageRef is not set!");
        else {
            pageRef.current.value = page.toString()
            setLocalPage(page);
        };

    }, [page])

    return (
        <Fragment>
            <div className="flex flex-col w-full p-3 border-4 border-t-0 border-l-0 border-r-0 border-red-600 rounded-sm">
                <div className="text-lg">
                    <form className="flex flex-col justify-between md:flex-row">
                        <input className="p-1 font-semibold text-red-600 bg-transparent border-b-2 rounded-sm md:grow md:mr-5" title="query" type={"text"} defaultValue={query} onChange={(e) => setQuery(e.target.value)} />
                        <button className="pt-1 pb-1 pl-3 pr-3 mt-3 font-medium bg-red-500 rounded-sm" onClick={(e) => handleOnSearchBtnClick(e)}>Search</button>
                    </form>
                </div>

                <div className="flex flex-col items-start justify-center mt-6 mb-1">
                    <form className="flex flex-row justify-between w-full text-lg font-medium" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <p className="inline">{`Page`}</p>
                            <button className={["text-xl font-medium rounded-sm ml-2 mr-1 pb-1 pl-1 pr-1 bg-red-600 text-neutral-100 disabled:bg-neutral-700"].join(" ")} disabled={page == 1 ? true : false} id="left" onClick={handlePageButtons}>{"<"}</button>
                            <input type={"number"} defaultValue={page} onChange={(e) => setLocalPage(parseInt(e.target.value))} min={1} max={pageLimit ? pageLimit : 1000} title="page" ref={pageRef} className="inline w-10 ml-2 mr-2 text-xl font-semibold text-center text-red-600 bg-transparent" />
                            <button className="pb-1 pl-1 pr-1 ml-1 mr-1 text-xl font-medium bg-red-600 rounded-sm text-neutral-100 disabled:bg-neutral-700" id="right" disabled={page >= pageLimit ? true : false} onClick={handlePageButtons}>{">"}</button>
                        </div>

                        <button id={"jump"} className="pt-1 pb-1 pl-3 pr-3 bg-red-500 rounded-sm text-neutral-100 disabled:bg-neutral-700" disabled={localPage > pageLimit || localPage == page || Number.isNaN(localPage)} onClick={handlePageButtons}>Jump to Page</button>
                    </form>
                    <p className="text-sm font-normal text-neutral-400">{
                        pageLimit ?
                            `${pageLimit} Total Pages`
                            : "loading..."
                    }</p>
                </div>
            </div>
        </Fragment>
    );
}


//TODO: Add a nice SVG
const SearchPage404 = () => {
    return (
        <div className="flex flex-col items-center justify-center pt-12 pb-12">
            <p className="font-semibold md:text-3xl text-neutral-200">Nothing found</p>
            <p className="text-xs md:text-base text-neutral-400">Check the spelling of the movie you searched for</p>
        </div>
    )
}


export function SearchContent({ data, error }: { data: MultiSearchResponse | undefined, error: Error | undefined }) {

    // console.log("data: ", data);
    if (!data && !error) return <MultiSearchSkeletons />;
    if (!data) return <p>Error, This should not appear</p>;
    if (data.results.length == 0) return <SearchPage404 />;
    return (
        <div className="grid grid-cols-1 auto-cols-auto md:grid-cols-2">
            {
                data.results.map((result: Result, index: number) => {
                    if (isMovieResult(result)) return <MultiSearchMovieCard key={`MovieCard:${index}`} result={result} />
                    else if (isTVShowResult(result)) return <MultiSearchTVShowCard key={`TVShowCard:${index}`} result={result} />
                    else if (isPersonResult(result)) return <MultiSearchPersonCard key={`PersonCard:${index}`} result={result} />
                    else return <p key={`Impossible${index}`}>{`You shouldn&apos;t see this check index: ${index}`}</p>
                })
            }
        </div>
    );
}

//TODO: Improve the Search Page

const MultiSearchSkeletons = () => {
    return (
        <div className="grid grid-cols-1 auto-cols-auto md:grid-cols-2">
            <MultiSearchSkeleton />
            <MultiSearchSkeleton />
            <MultiSearchSkeleton />
            <MultiSearchSkeleton />
            <MultiSearchSkeleton />
            <MultiSearchSkeleton />
        </div>
    );
}

const MultiSearchSkeleton = () => {
    return (
        <div className="animate-pulse flex flex-row h-[211px] p-3">
            <div className="w-[125px] h-full bg-gray-100 rounded-sm"></div>
            <div className="flex flex-col justify-between mt-2 ml-2 grow">
                <div className="flex flex-col gap-2">
                    <div className="w-8/12 h-2 bg-gray-100 rounded-md"></div>
                    <div className="w-6/12 h-2 bg-gray-100 rounded-md"></div>
                    <div className="w-6/12 h-2 bg-gray-100 rounded-md"></div>
                    <div className="w-4/12 h-2 bg-gray-100 rounded-md"></div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="w-8 h-6 bg-gray-100 rounded-md"></div>
                    <div className="h-4 bg-gray-100 rounded-md w-12/12"></div>
                </div>
            </div>
        </div>
    );
}