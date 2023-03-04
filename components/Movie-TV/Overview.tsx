"use client";

import { Fragment } from "react";

export function Overview({ overview }: { overview: string | undefined; }) {
    if (overview == undefined || overview.length < 1)
        return <Fragment />;
    return (
        <div className="">
            <p className="font-semibold text-xl text-neutral-100 mb-3">Overview</p>
            <p className="text-neutral-300">{overview}</p>
        </div>
    );
}
