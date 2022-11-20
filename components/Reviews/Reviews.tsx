import { Fragment, ReactNode } from "react";

export const Reviews = ({ className, children }: { className?: string; children: ReactNode; }) => {
    return (
        <div className={`${className}`}>
            <p className="font-semibold text-2xl text-neutral-100 mb-3">Comments</p>
            {children}
        </div>
    );
};

export const ReviewSkeletons = () => (
    <Fragment>
        <ReviewSkeleton />
        <ReviewSkeleton />
        <ReviewSkeleton />
        <ReviewSkeleton />
    </Fragment>
)

export const ReviewSkeleton = () => {
    return (
        <div className="w-auto h-[250px] mt-5 mb-5">

            <div className="h-[64px] flex flex-row gap-2">
                <div className="animate-pulse bg-gray-100 rounded-md w-16 h-16"></div>
                <div className="flex flex-col justify-center mt-1 gap-4">
                    <div className="animate-pulse bg-gray-100 w-16 h-6 rounded-md"></div>
                    <div className="animate-pulse bg-gray-400 w-28 h-6 rounded-md"></div>
                </div>
                <div className="flex flex-row items-center justify-end grow gap-2">
                    <div className="animate-pulse bg-gray-100 w-16 h-8 rounded-md"></div>
                    <div className="animate-pulse bg-gray-100 rounded-md w-10 h-10"></div>
                </div>
            </div>

            <div className="flex flex-col justify-evenly w-auto h-[192px]">
                <div className="animate-pulse rounded-md bg-gray-300 w-auto h-2"></div>
                <div className="animate-pulse rounded-md bg-gray-300 w-auto h-2"></div>
                <div className="animate-pulse rounded-md bg-gray-300 w-auto h-2"></div>
                <div className="animate-pulse rounded-md bg-gray-300 w-auto h-2"></div>
                <div className="animate-pulse rounded-md bg-gray-300 w-auto h-2"></div>
                <div className="animate-pulse rounded-md bg-gray-300 w-auto h-2"></div>
                <div className="animate-pulse rounded-md bg-gray-300 w-auto h-2"></div>
            </div>
        </div>
    )
}
