"use client";
import React, { Fragment, useMemo, useState } from "react";
import { Cast } from "../../types/Cast";
import PageBox from "./PageBox";
import Link from "next/link";
import { splitElementsInEqualArrays } from "../../utils";
import Image from "next/image";
import { PosterLoader } from "../../PosterLoader";
import Placeholder from "../../assets/MovieSVG.svg";
import CreditsSkeletons from "./CreditsSkeletons";

export const CreditsCastWidget = ({ cast }: { cast: Cast[]; }) => {
    const [page, setPage] = useState(1);

    return (
        <Fragment>
            <PageBox page={page} pageLimit={Math.ceil(cast.length / 12)} key={"movie-credits-cast-pagebox"} setPage={setPage} />
            <CreditsCastContent cast={cast} page={page} />
        </Fragment>
    );
};

export const CreditsCastContent = ({ cast, page }: { cast: Cast[], page: number }) => {

    let castPages: Array<Cast[]> = useMemo(() => [], []);
    castPages = useMemo(() => splitElementsInEqualArrays(cast), [cast]);

    if (!castPages) return <CreditsSkeletons />;
    return (
        <div className={"grid auto-cols-auto grid-cols-1 md:grid-cols-2"}>
            {castPages[page - 1].map((castee, index) => (
                <CreditsCasteeCard key={`${castee.cast_id}-${castee.department}-${index}`} castee={castee} />
            ))}
        </div>
    );
}

const CreditsCasteeCard = ({ castee }: { castee: Cast }) => {

    return (
        <Link key={castee.id} className="flex flex-row rounded-md p-3 hover:bg-neutral-900 gap-1" href={`/person/${castee.id}`} passHref>
            <Image
                src={castee.profile_path ? castee.profile_path : Placeholder.src}
                loader={PosterLoader}
                alt={`Poster of ${castee.name}`}
                width={125}
                height={187}
                className="rounded-md w-[125px] h-[187px]"
                loading="lazy" />
            <div className="grow flex flex-col justify-between font-medium text-base ml-2 mt-2">
                <div>
                    <p>{castee.name}</p>
                    <div className="text-neutral-400">
                        <p>{castee.character}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};