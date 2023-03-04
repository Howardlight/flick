import Image from "next/image"
import { PosterLoader } from "../../../PosterLoader"
import Placeholder from "../../../assets/MovieSVG.svg";
import moment from "moment";
import { Fragment, ReactElement } from "react";
import { Genre } from "../../../types/Movie";
import { isInPast } from "../../../app/search/[...query]/page";
import MainPageMetrics from "../MainPageMetrics";

function DesktopView({ children }: { children: ReactElement[] }) {
    return (
        <div className="flex flex-row justify-around p-5">
            {children}
        </div>
    )
}

const Poster = ({ url, name }: { url: string | undefined | null, name: string }) => {
    return (
        <Image
            title={name}
            src={url ? url : Placeholder.src}
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
        <div className="flex flex-col justify-between grow ml-5">
            {children}
        </div>
    )
}

const Description = ({ name, tagline, className }: { name: string, tagline: string, className: string }) => {
    return (

        // mb-5
        <div className={`${className}`}>
            <p className="font-bold text-3xl self-center text-neutral-100">{name}</p>
            <p className="text-sm self-center text-neutral-300">{tagline}</p>
        </div>
    )
}

const Genres = ({ genres }: { genres: Genre[] }) => {
    return (
        <div className="flex flex-row gap-1 mb-2">
            {genres.map((genre) => {
                return (
                    <div className="rounded-md border-2 border-red-600 font-medium text-sm p-1" key={genre.id}>
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
            <p className="font-semibold text-sm inline text-red-600">{epNum}</p>
            <p className="text-sm inline"> Episodes</p>
        </div>
    )
}

const Rating = ({ firstAirDate, voteAverage, voteCount }: { firstAirDate: Date, voteAverage: number, voteCount: number }) => {
    if (!isInPast(firstAirDate)) return <Fragment />;
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