import Image from "next/image";
import { TVShow } from "../../../types/TVShow";
import Placeholder from "../../../assets/MovieSVG.svg";
import { PosterLoader } from "../../../PosterLoader";
import { ReactElement } from "react";
import { Genre } from "../../../types/Movie";

type TwoChilren = [ReactElement, ReactElement];

function MobileView({ children }: { children: ReactElement[] }) {
    return (
        <div className="flex flex-col justify-center items-center p-5">
            {children}
        </div>
    )
}

const ContentWrapper = ({ children }: { children: ReactElement[] }) => {
    return (
        <div>
            {children}
        </div>
    )
}


const Poster = ({ url, name }: { url: string | undefined | null, name: string }) => {
    return (
        <Image
            src={url ? url : Placeholder.src}
            loader={PosterLoader}
            alt={`${name} Poster`}
            width={250}
            height={375}
            className="rounded-md w-[250px] h-[375px]"
        />
    )
}

const Description = ({ name, tagline }: { name: string, tagline: string }) => {
    return (
        <div className="flex flex-col grow mt-5">
            <p className="font-bold text-3xl self-center text-neutral-100">{name}</p>
            <p className="text-sm self-center text-neutral-300">{tagline}</p>
        </div>
    )
}

const Genres = ({ genres }: { genres: Genre[] }) => {
    return (
        <div className="flex flex-row mt-5 gap-3 flex-wrap justify-center">
            {genres.map((genre) => (
                <div key={`genre-${genre.id}`} className="text-base text-neutral-300 font-medium bg-red-600 p-2 rounded-md">
                    {genre.name}
                </div>
            ))}
        </div>
    )
}

MobileView.Poster = Poster;
MobileView.Wrapper = ContentWrapper;
ContentWrapper.Description = Description;
ContentWrapper.Genres = Genres;
// MobileView.Description = Description;
// MobileView.Genres = Genres;
export { MobileView };