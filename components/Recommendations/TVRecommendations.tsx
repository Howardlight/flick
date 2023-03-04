"use client";
import useSWR, { SWRResponse } from "swr";
import fetcher from "../../Fetcher";
import { TVRecResponse } from "../../types/GetRecommendationsTypes";
import { NoRecommendations, RecommendationsCard, RecommendationsError, RecommendationSkeletons } from "./RecommendationsBase";
import { useMediaQuery } from "react-responsive";
import { Fragment, useEffect, useState } from "react";
import { TVShow } from "../../types/TVShow";
import DownIcon from "../SVGComponents/DownIcon";
import { usePathname } from "next/navigation";

export const Recommendations = ({ id }: { id: number; }) => {

    const { data, error }: SWRResponse<TVRecResponse, Error> = useSWR(`/api/TV/getRecommendations/${id}`, fetcher);
    const [expand, setExpand] = useState(false);
    const dynamicRoute = usePathname();
    // console.log(data);

    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
    useEffect(() => setExpand(false), [dynamicRoute]);

    const TVCard = ({ tv, index }: { tv: TVShow, index: number }) => {
        return (
            <RecommendationsCard id={tv.id} index={index} mediaType={"tv"}>
                <RecommendationsCard.Poster url={tv.poster_path} title={tv.name} />
                <RecommendationsCard.Description airDate={tv.first_air_date} title={tv.name} />
            </RecommendationsCard>
        )
    };


    //TODO: EXPERIMENT: Try adding tags to each movie
    //TODO: Add more than 4 Recommendations?
    if (!data && !error) return <RecommendationSkeletons />;
    if (error) return <RecommendationsError />;
    if (data?.total_results == 0) return <NoRecommendations />;

    return (
        <div className="mt-4 flex flex-col">
            <p className="font-semibold text-neutral-100 text-xl mb-3">Recommendations</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-items-center">
                {data?.results.map((tv, index) => {
                    if (index < 12)
                        if (isMobile) {
                            if (expand) return <TVCard tv={tv} index={index} key={Math.random()} />;
                            else if (index < 6) return <TVCard tv={tv} index={index} key={Math.random()} />;
                            return;
                        } else return <TVCard tv={tv} index={index} key={Math.random()} />;
                    else return;
                })}
            </div>
            {isMobile && !expand ?
                <div
                    onClick={() => setExpand(true)}
                    className="w-auto h-8 flex justify-center items-center bg-neutral-900 hover:bg-neutral-800 rounded-sm">
                    <DownIcon className="hover:brightness-110" style={{ fill: "white" }} />
                </div>
                : <Fragment />
            }
        </div>
    )
        ;
};

export default Recommendations;