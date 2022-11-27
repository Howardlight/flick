import Image from "next/image";
import { PosterLoader } from "../PosterLoader";
import moment from "moment";
import Placeholder from "../assets/MovieSVG.svg";
import useSWR, { SWRResponse } from "swr";
import fetcher from "../Fetcher";
import { MovieRecResponse } from "../types/GetMovieRecommendationsTypes";
import Link from "next/link";

export const Recommendations = ({ id }: { id: number; }) => {

    const { data, error }: SWRResponse<MovieRecResponse, Error> = useSWR(`/api/Movie/getRecommendations/${id}`, fetcher);
    console.log(data);

    //TODO: EXPERIMENT: Try adding tags to each movie
    if (!data && !error)
        return <RecommendationSkeletons />;
    if (error)
        return <RecommendationsError />;

    if (data?.total_results == 0)
        return <NoRecommendations />;
    //TODO: Add Element saying "No Recommendations or something along it"
    return (
        <div className="mt-4">
            <p className="font-semibold text-neutral-100 text-2xl mb-3">Recommendations</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-items-center">
                {data?.results.map((movie, index) => {
                    if (index < 6)
                        return (
                            <div className="flex flex-col justify-center w-[187px] mb-5 p-3 hover:bg-neutral-900" key={`${movie.id}-${index}`}>
                                <Link href={`/movie/${movie.id}`} passHref>
                                    <a>
                                        <Image
                                            src={movie.poster_path ? movie.poster_path : Placeholder.src}
                                            alt={movie.title}
                                            loader={PosterLoader}
                                            width={187}
                                            height={280}
                                            className="rounded-sm" />
                                        <div className="mt-1">
                                            <p className="truncate">{movie.title}</p>
                                            <p className="text-neutral-400 truncate">{movie.release_date ? moment(movie.release_date).format("LL") : ""}</p>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        );
                })}
            </div>
        </div>
    );
};
const RecommendationsError = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[326px] w-auto">
            <p className="text-lg text-neutral-100">Could not load Recommendations</p>
            <p className="text-base text-neutral-400">Try again later</p>
        </div>
    );
};
const NoRecommendations = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[326px] w-auto">
            <p className="text-lg text-neutral-100">It seems there are no recommendations</p>
            <p className="text-base text-neutral-400">{`:(`}</p>
        </div>
    );
};
const RecommendationSkeletons = () => {
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
const RecommendationSkeleton = () => {
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
