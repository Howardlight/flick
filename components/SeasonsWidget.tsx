import Image from "next/future/image";
import { PosterLoader } from "../PosterLoader";
import moment from "moment";
import Placeholder from "../assets/MovieSVG.svg";
import { Season } from "../types/TVShow";
import Link from "next/link";

export const SeasonsWidget = ({ seasons, className }: { seasons: Season[]; className?: string; }) => {

    return (
        <div className={`${className}`}>
            <p className="font-semibold text-2xl text-neutral-100 mb-3">Seasons</p>
            <SeasonsContent seasons={seasons} />
        </div>
    );
};
const SeasonsContent = ({ seasons }: { seasons: Season[]; }) => {
    return (
        <div className="flex flex-row overflow-x-auto md:scrollbar-thin md:scrollbar-track-gray-100 md:scrollbar-thumb-red-600 pb-5 md:ml-2 md:mr-2">
            {seasons.map((season, index) => {
                // if (season.name.toLowerCase() === "specials") return;
                return (
                    <div key={`${index}-${season.id}`} className={"grid auto-cols-max ml-1 mr-1 p-2 hover:bg-neutral-900 rounded-sm transition-all delay-50"}>
                        <Link href={"/"} passHref>
                            <a>
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
                                    <p className="text-neutral-400">{moment(season.air_date).format("LL")}</p>
                                </div>
                            </a>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};
