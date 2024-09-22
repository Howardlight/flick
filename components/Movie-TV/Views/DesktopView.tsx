import Image from "next/image"
import { PosterLoader } from "../../../utils/PosterLoader"
import Placeholder from "../../../assets/MovieSVG.svg";
import moment from "moment";
import { Fragment, ReactElement } from "react";
import { Genre } from "../../../types/Movie";
import MainPageMetrics from "../MainPageMetrics";
import { isInPast } from "../../../utils/utils";
import { cn } from "../Images/cn";

function DesktopView({ className, children }: Readonly<{ className?: string, children: ReactElement[] }>) {
    return (
        <div className={cn(className ?? "", "flex flex-row justify-around p-5 max-md:hidden")}>
            {children}
        </div>
    )
}

const Poster = ({ shouldRender = true, url, name }: { shouldRender?: boolean, url: string | undefined | null, name: string }) => {
    if (!shouldRender) return <Fragment />;
    return (
        <Image
            title={name}
            src={url ?? Placeholder.src}
            loader={PosterLoader}
            alt={`${name} Poster`}
            width={250}
            height={375}
            className="rounded-md w-[250px] h-[375px]"
        />
    )
}


const ContentWrapper = ({ children }: { children: ReactElement[] }) => {
    return (
        <div className="flex flex-col justify-between ml-5 grow">
            {children}
        </div>
    )
}

const Description = ({ name, tagline, className }: { name: string, tagline: string, className: string }) => {
    return (

        // mb-5
        <div className={`${className}`}>
            <p className="self-center text-3xl font-bold text-neutral-100">{name}</p>
            <p className="self-center text-sm text-neutral-300">{tagline}</p>
        </div>
    )
}

const Genres = ({ shouldRender = true, genres }: { shouldRender?: boolean, genres: Genre[] }) => {
    if (!shouldRender) return <Fragment />;
    return (
        <div className="flex flex-row gap-1 mb-2">
            {genres.map((genre) => {
                return (
                    <div className="p-1 text-sm font-medium border-2 border-red-600 rounded-md" key={genre.id}>
                        {genre.name}
                    </div>
                )
            })}
        </div>
    )
}

const AirDates = ({ firstAirDate, lastAirDate }: { firstAirDate: Date, lastAirDate: Date }) => {
    return (
        <Fragment>
            <p className="text-sm">First aired on {moment(firstAirDate).format("LL")}</p>
            <p className="text-sm">Last aired on {moment(lastAirDate).format("LL")}</p>
        </Fragment>
    );
}

const EpNum = ({ epNum }: { epNum: number }) => {
    return (
        <div>
            <p className="inline text-sm font-semibold text-red-600">{epNum}</p>
            <p className="inline text-sm"> Episodes</p>
        </div>
    )
}

const Rating = ({ shouldRender = true, firstAirDate, voteAverage, voteCount }: { shouldRender?: boolean, firstAirDate: Date, voteAverage: number, voteCount: number }) => {
    if (!shouldRender || !isInPast(firstAirDate)) return <Fragment />;
    return <MainPageMetrics vote_average={voteAverage} vote_count={voteCount} />;
}

DesktopView.Poster = Poster;
DesktopView.Wrapper = ContentWrapper;
ContentWrapper.Description = Description;
ContentWrapper.Genres = Genres;
ContentWrapper.AirDates = AirDates;
ContentWrapper.EpNumber = EpNum;
ContentWrapper.Rating = Rating;
export { DesktopView };