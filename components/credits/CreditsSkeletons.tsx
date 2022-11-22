import React, { Fragment } from "react";


export const CreditsSkeletons = () => {
    return (
        <Fragment>
            <CreditsSkeleton />
            <CreditsSkeleton />
            <CreditsSkeleton />
            <CreditsSkeleton />
            <CreditsSkeleton />
        </Fragment>

    );
};

const CreditsSkeleton = () => {
    return (
        <div className=" w-[359px] h-[211px] flex flex-row p-3">
            <div className="animate-pulse bg-neutral-400 w-[125px] h-[187px] rounded-sm"></div>
            <div className="animate-pulse flex flex-col gap-1 grow ml-2 mr-2">
                <div className="bg-neutral-400 h-2 w-auto rounded-sm"></div>
                <div className="bg-neutral-400 h-2 w-8/12 rounded-sm"></div>
            </div>
        </div>
    );
};

export default CreditsSkeletons;
