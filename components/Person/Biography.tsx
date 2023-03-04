"use client";
import { Fragment, useEffect, useState } from "react";
import React from "react";


export const Biography = ({ biography }: { biography: string; }): React.ReactElement => {


    // logic clarification: is showMoreButton needed?
    // yes, substring and button. 
    // no, dump the bio
    const [showMore, setShowMore] = useState(false);
    useEffect(() => {
        if (biography.length > 250)
            setShowMore(true);

    }, []);

    if (!biography || biography == "")
        return <Fragment></Fragment>;
    return (
        <div className="mt-4">
            <p className="font-semibold text-2xl">Biography</p>
            <p className="inline">{showMore ? `${biography.substring(0, 250)}` : biography}</p>
            {showMore ? <button className="ml-1 font-medium text-lg text-red-600 inline" onClick={() => setShowMore(false)}>Show more</button> : <Fragment />}
        </div>
    );
};
