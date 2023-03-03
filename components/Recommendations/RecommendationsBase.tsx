import Link from "next/link";
import Image from "next/image";
import { Fragment, ReactElement } from "react";
import { PosterLoader } from "../../PosterLoader";
import Placeholder from "../../assets/MovieSVG.svg";
import moment from "moment";

const RecommendationsCard = ({ id, index, mediaType, children }: { id: number, index: number, mediaType: string, children: ReactElement[] }) => {

    // Design error- When there is no release date, the hover effect does not appear over its area, but rather
    // stops at the title
    return (
        <div className="flex flex-col w-[187px] mb-5 p-1" key={`${id}-${index}-${Math.random() * 100}`}>
            <Link href={`/${mediaType}/${id}`} className="p-2 hover:bg-neutral-900 rounded-sm" passHref>
                {children}
            </Link>
        </div>
    )
}

const Poster = ({ url, title }: { url: string | null, title: string }) => {
    return (
        <Image
            title={title}
            src={url ? url : Placeholder.src}
            alt={title}
            loader={PosterLoader}
            width={187}
            height={280}
            className="rounded-sm" />
    )
}

const Description = ({ airDate, title }: { airDate: Date, title: string }) => {
    return (
        <div className="mt-1 grow">
            <p className="truncate">{title}</p>
            <p className="text-neutral-400 truncate">{airDate ? moment(airDate).format("LL") : ""}</p>
        </div>
    )
}

RecommendationsCard.Poster = Poster;
RecommendationsCard.Description = Description;
export { RecommendationsCard };

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