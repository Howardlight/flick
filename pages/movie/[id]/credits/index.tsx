import { Tab } from "@headlessui/react";
import { GetServerSidePropsContext } from "next";
import React, { Dispatch, Fragment, RefObject, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { Navbar } from "../../../../components/Navbar";
import { CreditsResponse } from "../../../../types/GetCreditsTypes";
import { MovieCreditsCastWidget } from "../../../../components/movie/credits/MovieCreditsCastWidget";
import { MovieCreditsCrewWidget } from "../../../../components/movie/credits/MovieCreditsCrewWidget";

const MovieCredits = ({ data }: { data: CreditsResponse }) => {


    //TODO: CREATE COMPONENTS TAILORED TO THIS PAGE OR ADAPT MULTISEARCHPERSON TO BE MODULAR
    console.log(data);

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

export const PageBox = ({ page, pageLimit, setPage }:
    { page: number, pageLimit: number, setPage: Dispatch<SetStateAction<number>> }) => {

    // Used for the shadow Page changing without messing with the actual Page
    const [localPage, setLocalPage] = useState(page);
    const pageRef: RefObject<HTMLInputElement> = useRef(null);

    const handlePageButtons = (e: any) => {

        //checks ID, depending on ID, Updates Page
        if (e.target.id === 'right') setPage(page + 1);
        else if (e.target.id === "left") setPage(page - 1);
        else if (e.target.id === "jump") setPage(localPage);
    }

    useEffect(() => {

        //TODO: add DOCS to clarify what's going on
        // checks if reference to the Page input is valid, if so
        // set its content to the current Page AND set LocalPage to Page
        if (!pageRef.current) throw Error("PageRef is not set!");
        else {
            pageRef.current.value = page.toString();
            setLocalPage(page);
        };

    }, [page])

    //TODO: when clicking on search button, check if the target value is the same as current value, if so DO NOT push with router    
    //TODO: REFACTOR
    return (
        <div className="flex flex-col justify-center items-start mt-6 mb-1 border-b-2 pb-4 border-red-600">
            <form className="flex flex-row w-full justify-between text-lg font-medium" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <p className="inline">{`Page`}</p>
                    <button className={["text-xl font-medium rounded-sm ml-2 mr-1 pb-1 pl-1 pr-1 bg-red-600 text-neutral-100 disabled:bg-neutral-700"].join(" ")} disabled={page == 1 ? true : false} id="left" onClick={handlePageButtons}>{"<"}</button>
                    <input type={"number"} defaultValue={page} onChange={(e) => setLocalPage(parseInt(e.target.value))} min={1} max={pageLimit ? pageLimit : 1000} title="page" ref={pageRef} className="text-center text-xl font-semibold ml-2 mr-2 text-red-600 inline w-10 bg-transparent" />
                    <button className="text-xl font-medium rounded-sm ml-1 mr-1 pb-1 pl-1 pr-1 bg-red-600 text-neutral-100 disabled:bg-neutral-700" id="right" disabled={page == pageLimit ? true : false} onClick={handlePageButtons}>{">"}</button>
                </div>

                <button id={"jump"} className="bg-red-500 text-neutral-100 pl-3 pr-3 pt-1 pb-1 rounded-sm disabled:bg-neutral-700" disabled={localPage > pageLimit || localPage == page} onClick={handlePageButtons}>Jump to Page</button>
            </form>
            <p className="text-sm font-normal text-neutral-400">{
                pageLimit ? `${pageLimit} Total Pages`
                    : "loading..."
            }</p>
        </div>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let data: CreditsResponse;

    const request = await fetch(`https://api.themoviedb.org/3/movie/${context.query.id}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    data = await request.json();

    return {
        props: {
            data: data
        }
    }
}

export default MovieCredits;