"use client";
import { Fragment } from "react";
import { Person } from "../../types/Person";
import Image from "next/image";
import { PosterLoader } from "../../utils/PosterLoader";
import React from "react";
import Placeholder from "../../assets/MovieSVG.svg";
import { Biography } from "./Biography";
import { PersonalDetails } from "./PersonalDetails";

export const PersonPageContent = ({ data }: { data: Person; }) => {
    return (
        <Fragment>
            <div className="flex flex-col justify-center items-center mt-5">
                <Image
                    src={data.profile_path ? data.profile_path : Placeholder.src}
                    loader={PosterLoader}
                    alt={`img of ${data.name}`}
                    width={250}
                    height={375}
                    className="rounded-md"
                    loading="lazy" />
                <div className="mt-3 flex flex-col ">
                    <p className="font-semibold text-3xl text-neutral-100">{data.name}</p>
                </div>
            </div>

            <div className="ml-4 mr-4 mt-10 mb-10">

                <PersonalDetails data={data} />

                <Biography biography={data.biography} />
            </div>
        </Fragment>
    );
};
