"use client";
import { useState } from "react"
import Image from "next/image"
import Placeholder from "../../../assets/MovieSVG.svg";
import { Backdrop } from "../../../types/Images";
import { PosterLoader } from "../../../utils/PosterLoader";
import Star from "../../SVGComponents/Star";

export default function BlurImage({ image }: { image: Backdrop }) {
    const [isLoading, setLoading] = useState(true)

    return (
        <a href={`https://image.tmdb.org/t/p/w500/${image.file_path}`} className="mb-5 group" >
            <div className="aspect-w-1 aspect-h-1 w-[163px] h-[245px] overflow-hidden rounded-sm bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <Image
                    src={image.file_path ? image.file_path : Placeholder.src}
                    loader={PosterLoader}
                    fill
                    style={{ objectFit: "cover" }}
                    alt=""
                    className={cn(
                        'duration-700 ease-in-out group-hover:opacity-75',
                        isLoading
                            ? 'scale-110 blur-2xl grayscale'
                            : 'scale-100 blur-0 grayscale-0'
                    )}
                    onLoad={() => setLoading(false)}
                />
            </div>
            <div className="flex flex-row items-center justify-between mt-2">
                <p className="mt-1 text-base text-neutral-400">{image.vote_count} Reviews</p>
                <div className="flex flex-row justify-center gap-2">
                    <h3 className="text-base font-medium text-neutral-100">{Math.round(image.vote_average * 10) / 10}</h3>
                    <Star className="self-end mb-[10%]" />
                </div>
            </div>
        </a >
    )
}

export function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}