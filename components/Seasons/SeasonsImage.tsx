"use client";
import Image from "next/image";
import Placeholder from "../../assets/MovieSVG.svg";
import { PosterLoader } from "../../PosterLoader";

export default function SeasonsImage({ posterPath, name }: { posterPath: string, name: string }) {
    return (
        <Image
            src={posterPath ? posterPath : Placeholder.src}
            loader={PosterLoader}
            alt={`${name} Poster`}
            width={125}
            height={187}
            className="rounded-sm w-[125px] h-[187px]"
        />
    )
}