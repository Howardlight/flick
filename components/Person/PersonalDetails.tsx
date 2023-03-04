"use client";
import { Fragment } from "react";
import { Person } from "../../types/Person";
import React from "react";


export const PersonalDetails = ({ data }: { data: Person; }) => {
    return (
        <div className="font-base text-lg">
            {data.known_for_department ?
                <div>
                    <p className="inline">Known for: </p>
                    <p className="inline text-red-500 font-semibold">{data.known_for_department}</p>
                </div>
                : <Fragment />}

            {data.gender ?
                <div>
                    <p className="inline">Gender: </p>
                    <p className="text-red-500 font-semibold inline">{data.gender == 1 ? "Female" : "Male"}</p>
                </div>
                : <Fragment />}

            {data.birthday ?
                <div>
                    <p className="inline">Birthday: </p>
                    <p className="text-red-500 font-semibold inline">{data.birthday.toString()}</p>
                </div>
                : <Fragment />}

            {data.deathday ?
                <div>
                    <p className="inline">Died: </p>
                    <p className="text-red-500 font-semibold inline">{data.deathday.toString()}</p>
                </div>
                : <Fragment />}
            {data.place_of_birth ?
                <div>
                    <p className="inline">Born in </p>
                    <p className="text-red-500 font-semibold inline">{data.place_of_birth}</p>
                </div>
                : <Fragment />}


        </div>
    );
};
