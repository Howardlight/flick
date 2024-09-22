"use client";
import { Fragment, useEffect, useState } from "react";
import React from "react";


export const Biography = ({ biography }: { biography: string; }): React.ReactElement => {


    // logic clarification: is showMoreButton needed?
    // yes, substring and button. 
    // no, dump the bio
    const [showMore, setShowMore] = useState(biography?.length > 250);

    if (!biography || biography == "")
        return <Fragment></Fragment>;
    return (
        <div className="mt-4">
            <p className="text-2xl font-semibold">Biography</p>
            <p className="inline">{showMore ? `${biography.substring(0, 250)}` : biography}</p>
            {showMore ? <button className="inline ml-1 text-lg font-medium text-red-600" onClick={() => setShowMore(false)}>Show more</button> : <Fragment />}
        </div>
    );
};
