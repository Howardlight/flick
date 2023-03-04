"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { NextRouter } from "next/router";
import { Dispatch, Fragment, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { isMovieResult, isPersonResult, isTVShowResult, MultiSearchResponse, Result } from "../../types/MultiSearchTypes";
import { MultiSearchMovieCard, MultiSearchPersonCard, MultiSearchTVShowCard } from "./MultiSearchCards";

export function SearchBox(
    { router, prevQuery, pageLimit, page, setPage }:
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
            <div className="flex flex-col p-3 border-4 border-red-600 rounded-sm border-t-0 border-l-0 border-r-0 w-full">
                <div className="text-lg">
                    <form className="flex flex-col justify-between md:flex-row">
                        <input className="font-semibold text-red-600 p-1 rounded-sm bg-transparent border-b-2 md:grow md:mr-5" title="query" type={"text"} defaultValue={query} onChange={(e) => setQuery(e.target.value)} />
                        <button className="mt-3 font-medium rounded-sm bg-red-500 pl-3 pr-3 pt-1 pb-1" onClick={(e) => handleOnSearchBtnClick(e)}>Search</button>
                    </form>
                </div>

                <div className="flex flex-col justify-center items-start mt-6 mb-1">
                    <form className="flex flex-row w-full justify-between text-lg font-medium" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <p className="inline">{`Page`}</p>
                            <button className={["text-xl font-medium rounded-sm ml-2 mr-1 pb-1 pl-1 pr-1 bg-red-600 text-neutral-100 disabled:bg-neutral-700"].join(" ")} disabled={page == 1 ? true : false} id="left" onClick={handlePageButtons}>{"<"}</button>
                            <input type={"number"} defaultValue={page} onChange={(e) => setLocalPage(parseInt(e.target.value))} min={1} max={pageLimit ? pageLimit : 1000} title="page" ref={pageRef} className="text-center text-xl font-semibold ml-2 mr-2 text-red-600 inline w-10 bg-transparent" />
                            <button className="text-xl font-medium rounded-sm ml-1 mr-1 pb-1 pl-1 pr-1 bg-red-600 text-neutral-100 disabled:bg-neutral-700" id="right" disabled={page >= pageLimit ? true : false} onClick={handlePageButtons}>{">"}</button>
                        </div>

                        <button id={"jump"} className="bg-red-500 text-neutral-100 pl-3 pr-3 pt-1 pb-1 rounded-sm disabled:bg-neutral-700" disabled={localPage > pageLimit || localPage == page || Number.isNaN(localPage)} onClick={handlePageButtons}>Jump to Page</button>
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


const SearchPage404 = () => {
    return (
        <div className="flex flex-col justify-center items-center grow">
            <p className="text-3xl text-neutral-200 font-semibold">Nothing found</p>
            <p className="text-base text-neutral-400">Check the spelling of the movie you searched for</p>
        </div>
    )
}


export function SearchContent({ data, error }: { data: MultiSearchResponse | undefined, error: Error | undefined }) {

    // console.log("data: ", data);
    if (!data && !error) return <MultiSearchSkeletons />;
    if (!data) return <p>Error, This should not appear</p>;
    if (data.results.length == 0) return <SearchPage404 />;
    return (
        <div className="grid auto-cols-auto grid-cols-1 md:grid-cols-2">
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

const MultiSearchSkeletons = () => {
    return (
        <div className="grid auto-cols-auto grid-cols-1 md:grid-cols-2">
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
            <div className="flex flex-col justify-between ml-2 mt-2 grow">
                <div className="flex flex-col gap-2">
                    <div className="bg-gray-100 w-8/12 h-2 rounded-md"></div>
                    <div className="bg-gray-100 w-6/12 h-2 rounded-md"></div>
                    <div className="bg-gray-100 w-6/12 h-2 rounded-md"></div>
                    <div className="bg-gray-100 w-4/12 h-2 rounded-md"></div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="bg-gray-100 w-8 h-6 rounded-md"></div>
                    <div className="bg-gray-100 w-12/12 h-4 rounded-md"></div>
                </div>
            </div>
        </div>
    );
}