import { Fragment } from "react";

export const RecommendationsError = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[326px] w-auto">
            <p className="text-lg text-neutral-100">Could not load Recommendations</p>
            <p className="text-base text-neutral-400">Try again later</p>
        </div>
    );
};
export const NoRecommendations = () => {
    return (
        // <div className="flex flex-col items-center justify-center h-[326px] w-auto">
        //     <p className="text-lg text-neutral-100">It seems there are no recommendations</p>
        //     <p className="text-base text-neutral-400">{`:(`}</p>
        // </div>
        <Fragment />
    );
};
export const RecommendationSkeletons = () => {
    return (
        <div className="mt-4">
            <div className="animate-pulse bg-neutral-200 w-4/12 h-2 mb-3 rounded-sm"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-items-center">
                <RecommendationSkeleton />
                <RecommendationSkeleton />
                <RecommendationSkeleton />
                <RecommendationSkeleton />
                <RecommendationSkeleton />
                <RecommendationSkeleton />
            </div>
        </div>
    );
};
export const RecommendationSkeleton = () => {
    return (
        <div className="mb-5 p-3">
            <div className="animate-pulse bg-neutral-400 w-[163px] h-[245px] rounded-sm"></div>
            <div className="mt-4 flex flex-col gap-1">
                <div className="bg-neutral-600 animate-pulse w-3/6 h-2 rounded-md mr-1"></div>
                <div className="bg-neutral-400 animate-pulse w-4/6 h-2 rounded-md mr-1"></div>
            </div>
        </div>
    );
};