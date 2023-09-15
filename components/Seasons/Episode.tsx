"use client";
import { Fragment } from "react";
import Image from "next/image";
import { Episode } from "../../types/Episode";
import moment from "moment";
import Star from "../../assets/Star.svg";
import { isInPast } from "../../Utils";

export const Episodes = ({ eps }: { eps: Episode[] }) => {
    // console.log(eps);
    return (
        <Fragment>
            {eps.map((ep, index) => (<Episode key={`${ep.episode_number}-${ep.id}-${index}`} ep={ep} />))}
        </Fragment>

    )
}

export function EpisodeDate({ airDate }: { airDate: Date }) {
    if (airDate) return <p className="font-medium text-neutral-400">{moment(airDate).format("LL")}</p>;
    return <Fragment />;
}


//TODO: Add read more for longer overviews
//TODO: Add min width and max width
//TODO: Add Cast involved
//TODO: Create Layouts
//TODO: Add case for when it is unknown when an episode will air
const Episode = ({ ep }: { ep: Episode }) => {
    return (
        <div className="mt-4 mb-4 flex flex-col mr-2 bg-neutral-900 rounded-sm p-3">
            <div className={"mb-2"}>
                <p className="font-medium">{`Episode ${ep.episode_number} - ${ep.name}`}</p>
                {
                    ep.air_date && isInPast(ep.air_date) ?
                        <p className="text-neutral-400 font-medium">{`Aired on ${moment(ep.air_date).format("LL")}`}</p>
                        : <p className="text-neutral-400 font-medium">{`To Be Released on ${moment(ep.air_date).format("LL")}`}</p>
                }

            </div>

            <p className="text-neutral-400 text-sm mb-6">{ep.overview}</p>
            {
                isInPast(ep.air_date) && ep.vote_count != 0 ?
                    <div className="flex flex-row justify-end items-center gap-2">
                        <p className="inline text-base font-medium">{Math.round(ep.vote_average * 10) / 10}</p>
                        <Image className="inline" src={Star.src} width={24} height={24} alt={"Stars"} />
                    </div>
                    : <Fragment />
            }
        </div>
    )
}
