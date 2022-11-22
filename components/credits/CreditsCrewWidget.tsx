import Link from "next/link";
import React, { Fragment, useMemo, useState } from "react";
import { Crew } from "../../types/Crew";
import { splitElementsInEqualArrays } from "../../Utils";
import PageBox from "./PageBox";
import Image from "next/image";
import { PosterLoader } from "../../PosterLoader";
import Placeholder from "../../assets/MovieSVG.svg";
import { MovieCreditsSkeletons } from "./CreditsCastWidget";

export const MovieCreditsCrewWidget = ({ crew }: { crew: Crew[]; }) => {
    const [page, setPage] = useState(1);

    return (
        <Fragment>
            <PageBox page={page} pageLimit={Math.ceil(crew.length / 12)} key={"movie-credits-crew-pagebox"} setPage={setPage} />
            <MovieCreditsCrewContent crew={crew} page={page} />
        </Fragment>
    );
};

export const MovieCreditsCrewContent = ({ crew, page }: { crew: Crew[], page: number }) => {

    let crewPages: Array<Crew[]> = useMemo(() => [], []);
    crewPages = useMemo(() => splitElementsInEqualArrays(crew), [crew]);

    //NOTE: in standard cases the Skeleton is never used, but it's good to have it just incase
    if (!crewPages) return <MovieCreditsSkeletons />;
    return (
        <div className={"grid auto-cols-auto grid-cols-1 md:grid-cols-2"}>
            {crewPages[page - 1].map((crewPerson) => (
                <MovieCreditsCrewCard key={`${crewPerson.id}-${crewPerson.job}`} crew={crewPerson} />
            ))}
        </div>
    );
}

const MovieCreditsCrewCard = ({ crew }: { crew: Crew, }) => {

    function HandleKnownForDepartment({ department, gender }: { department: string, gender: number }) {

        if (department === "Acting") return <p>{gender == 1 ? "Actress" : "Actor"}</p>;
        if (department === "Production") return <p>Producer</p>;
        if (department === "Visual Effects") return <p>Visual Effects Designer</p>;
        if (department === "Sound") return <p>Sound Designer</p>;
        if (department === "Writing") return <p>Writer</p>;
        else return <p>Unknown Department</p>;
    }

    return (
        <Link key={crew.id} href={`/person/${crew.id}`} passHref>
            <a className="flex flex-row rounded-md p-3 hover:bg-neutral-900 gap-1">
                <Image
                    src={crew.profile_path ? crew.profile_path : Placeholder.src}
                    loader={PosterLoader}
                    alt={`Poster of ${crew.name}`}
                    width={125}
                    height={187}
                    className="rounded-md w-[125px] h-[187px]"
                    loading="lazy" />
                <div className="grow flex flex-col justify-between font-medium text-base ml-2 mt-2">
                    <div>
                        <p>{crew.name}</p>
                        <div className="text-neutral-400">
                            <p>{crew.job}</p>
                            {/* <HandleKnownForDepartment department={crew.department} /> */}
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    );
}
