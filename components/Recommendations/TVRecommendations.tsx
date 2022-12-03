import Image from "next/image";
import { PosterLoader } from "../../PosterLoader";
import moment from "moment";
import Placeholder from "../../assets/MovieSVG.svg";
import useSWR, { SWRResponse } from "swr";
import fetcher from "../../Fetcher";
import { TVRecResponse } from "../../types/GetRecommendationsTypes";
import Link from "next/link";
import { NoRecommendations, RecommendationsError, RecommendationSkeletons } from "./RecommendationsBase";
import { useMediaQuery } from "react-responsive";
import { Fragment, useEffect, useState } from "react";
import { TVShow } from "../../types/TVShow";
import DownIcon from "../SVGComponents/DownIcon";
import { useRouter } from "next/router";

export const Recommendations = ({ id }: { id: number; }) => {

    const { data, error }: SWRResponse<TVRecResponse, Error> = useSWR(`/api/TV/getRecommendations/${id}`, fetcher);
    const [expand, setExpand] = useState(false);
    const dynamicRoute = useRouter().asPath;
    console.log(data);

    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
    useEffect(() => setExpand(false), [dynamicRoute]);

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
                            if (expand) return <RecommendationCard tv={tv} index={index} />;
                            else if (index < 6) return <RecommendationCard tv={tv} index={index} />;
                            return;
                        } else return <RecommendationCard tv={tv} index={index} />;
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

const RecommendationCard = ({ tv, index }: { tv: TVShow, index: number }) => {
    return (
        <div className="flex flex-col w-[187px] mb-5 p-1"
            key={`${tv.id}-${index}`}>
            <Link href={`/tv/${tv.id}`} passHref>
                {/*Design error- When there is no release date, the hover effect does not appear over its area, but rather*/}
                {/*stops at the title*/}
                <a className={"p-2 hover:bg-neutral-900 rounded-sm"}>
                    <Image
                        src={tv.poster_path ? tv.poster_path : Placeholder.src}
                        alt={tv.name}
                        loader={PosterLoader}
                        width={187}
                        height={280}
                        className="rounded-sm" />
                    <div className="mt-1 grow">
                        <p className="truncate">{tv.name}</p>
                        <p className="text-neutral-400 truncate">{tv.first_air_date ? moment(tv.first_air_date).format("LL") : ""}</p>
                    </div>
                </a>
            </Link>
        </div>
    );
}

export default Recommendations;