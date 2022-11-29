import Image from "next/image";
import { PosterLoader } from "../../PosterLoader";
import moment from "moment";
import Placeholder from "../../assets/MovieSVG.svg";
import useSWR, { SWRResponse } from "swr";
import fetcher from "../../Fetcher";
import { TVRecResponse } from "../../types/GetRecommendationsTypes";
import Link from "next/link";
import { NoRecommendations, RecommendationsError, RecommendationSkeletons } from "./RecommendationsBase";

export const Recommendations = ({ id }: { id: number; }) => {

    const { data, error }: SWRResponse<TVRecResponse, Error> = useSWR(`/api/TV/getRecommendations/${id}`, fetcher);
    console.log(data);

    //TODO: EXPERIMENT: Try adding tags to each movie
    //TODO: Add more than 4 Recommendations?
    if (!data && !error) return <RecommendationSkeletons />;
    if (error) return <RecommendationsError />;
    if (data?.total_results == 0) return <NoRecommendations />;

    return (
        <div className="mt-4">
            <p className="font-semibold text-neutral-100 text-2xl mb-3">Recommendations</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-items-center">
                {data?.results.map((tv, index) => {
                    if (index < 6)
                        return (
                            <div className="flex flex-col w-[187px] mb-5 p-3 hover:bg-neutral-900 rounded-sm" key={`${tv.id}-${index}`}>
                                <Link href={`/tv/${tv.id}`} passHref>
                                    <a>
                                        <Image
                                            src={tv.poster_path ? tv.poster_path : Placeholder.src}
                                            alt={tv.name}
                                            loader={PosterLoader}
                                            width={187}
                                            height={280}
                                            className="rounded-sm" />
                                        <div className="mt-1">
                                            <p className="truncate">{tv.name}</p>
                                            <p className="text-neutral-400 truncate">{tv.first_air_date ? moment(tv.first_air_date).format("LL") : ""}</p>
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

export default Recommendations;