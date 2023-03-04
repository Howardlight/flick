"use client";
import Image from "next/image";
import { PosterLoader } from "../../PosterLoader";
import moment from "moment";
import Placeholder from "../../assets/MovieSVG.svg";
import useSWR, { SWRResponse } from "swr";
import fetcher from "../../Fetcher";
import { MovieRecResponse } from "../../types/GetRecommendationsTypes";
import Link from "next/link";
import { NoRecommendations, RecommendationsCard, RecommendationsError, RecommendationSkeletons } from "./RecommendationsBase";
import { useMediaQuery } from "react-responsive";
import DownIcon from "../SVGComponents/DownIcon";
import { Fragment, useEffect, useState } from "react";
import { Movie } from "../../types/Movie";
import { useRouter } from "next/navigation";

export const Recommendations = ({ id }: { id: number; }) => {

    const { data, error }: SWRResponse<MovieRecResponse, Error> = useSWR(`/api/Movie/getRecommendations/${id}`, fetcher);
    const [expand, setExpand] = useState(false);
    const dynamicRoute = useRouter().asPath;

    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
    useEffect(() => setExpand(false), [dynamicRoute]);

    const MovieCard = ({ movie, index }: { movie: Movie, index: number }) => {
        return (
            <RecommendationsCard id={movie.id} index={index} mediaType={"movie"}>
                <RecommendationsCard.Poster url={movie.poster_path} title={movie.title} />
                <RecommendationsCard.Description airDate={movie.release_date} title={movie.title} />
            </RecommendationsCard>
        )
    };

    //TODO: EXPERIMENT: Try adding tags to each movie
    if (!data && !error) return <RecommendationSkeletons />;
    if (error) return <RecommendationsError />;
    if (data?.total_results == 0) return <NoRecommendations />;

    return (
        <div className="mt-4 flex flex-col">
            <p className="font-semibold text-neutral-100 text-xl mb-3">Recommendations</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-items-center">
                {data?.results.map((movie, index) => {
                    if (index < 12)
                        if (isMobile) {
                            if (expand) return <MovieCard index={index} movie={movie} key={Math.random()} />;
                            else if (index < 6) return <MovieCard index={index} movie={movie} key={Math.random()} />;
                            return;
                        } else return <MovieCard index={index} movie={movie} key={Math.random()} />;
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
    );
};

export default Recommendations;