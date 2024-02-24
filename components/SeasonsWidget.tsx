"use client"
import Image from "next/image";
import { PosterLoader } from "../utils/PosterLoader";
import moment from "moment";
import Placeholder from "../assets/MovieSVG.svg";
import { Season } from "../types/TVShow";
import Link from "next/link";
import { Fragment } from "react";

export const SeasonsWidget = ({ seasons, TVID, className }: { seasons: Season[], TVID: number, className?: string }) => {

    return (
        <div className={`${className}`}>
            <p className="font-semibold text-xl text-neutral-100 mb-3">Seasons</p>
            <SeasonsContent seasons={seasons} TVID={TVID} />
        </div>
    );
};

//TODO: Improve Rating styling
//TODO: Improve Formatting for air_date
const SeasonsContent = ({ seasons, TVID }: { seasons: Season[], TVID: number }) => {
    return (
        <div className="flex flex-row overflow-x-auto md:scrollbar-thin md:scrollbar-track-gray-100 md:scrollbar-thumb-red-600 pb-5 md:ml-2 md:mr-2">
            {seasons.map((season, index) => {
                if (season.episode_count == 0) return;
                return (
                    <div key={`${index}-${season.id}`} className={"grid auto-cols-max ml-1 mr-1 p-2 hover:bg-neutral-900 rounded-sm transition-all delay-50"}>
                        <Link href={`/tv/${TVID}/season/${season.season_number}`} passHref>
                            <Image
                                src={season.poster_path ? season.poster_path : Placeholder.src}
                                alt={`Poster of ${season.name}`}
                                loader={PosterLoader}
                                width={125}
                                height={187}
                                className="rounded-md w-[125px] h-[187px]" />
                            <div className="w-[125px] mt-1 truncate overflow-x-hidden text-neutral-100">
                                <p className="truncate font-medium">{season.name}</p>
                                <div>
                                    <p className="font-medium text-red-600 inline">{season.episode_count} </p>
                                    <p className="inline font-medium text-sm"> Episodes</p>
                                </div>
                                {season.name.toLowerCase() !== "specials" ?
                                    <p className="text-neutral-400 truncate">{moment(season.air_date).format("LL")}</p>
                                    : <Fragment />
                                }
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};
