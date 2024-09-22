import Image from "next/image";
import Placeholder from "../../../assets/MovieSVG.svg";
import { PosterLoader } from "../../../utils/PosterLoader";
import { ReactElement } from "react";
import { Genre } from "../../../types/Movie";
import { cn } from "../Images/BlurImage";

type TwoChilren = [ReactElement, ReactElement];

function MobileView({ className, children }: { className?: string, children: ReactElement[] }) {
    return (
        <div className={cn(className ?? "", "flex flex-col justify-center items-center md:hidden p-5")}>
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

const Description = ({ name, tagline }: { name: string, tagline: string }) => {
    return (
        <div className="flex flex-col mt-5 grow">
            <p className="self-center mb-3 text-3xl font-bold text-center text-neutral-100">{name}</p>
            <p className="self-center text-sm text-neutral-300">{tagline}</p>
        </div>
    )
}

const Genres = ({ genres }: { genres: Genre[] }) => {
    return (
        <div className="flex flex-row flex-wrap justify-center gap-3 mt-8">
            {genres.map((genre) => (
                <div key={`genre-${genre.id}`} className="p-2 text-base font-medium bg-red-600 rounded-md text-neutral-300">
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