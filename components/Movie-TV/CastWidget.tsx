import Image from "next/image";
import { PosterLoader } from "../../utils/PosterLoader";
import { CreditsResponse } from "../../types/GetCreditsTypes";
import { Cast } from "../../types/Cast";
import Placeholder from "../../assets/MovieSVG.svg";
import Link from "next/link";
import { Fragment, Suspense } from "react";
import { IndexWidgetScrollBar } from "../Index/IndexWidgetBase";

async function getCastData(contentID: string, mediaType: string) {
    if (mediaType === "Movie") {

        const req = await fetch(
            `https://api.themoviedb.org/3/movie/${contentID}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
            { cache: "default" }
        );
        const data: CreditsResponse | null = await req.json();

        return data;
    } else if (mediaType === "TV") {
        const req = await fetch(`https://api.themoviedb.org/3/tv/${contentID}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
            { cache: "default" }
        );
        const data: CreditsResponse | null = await req.json();

        return data;
    }
}


export function CastWidget({ ID, mediaType, className }: { ID: string, mediaType: string, className?: string }) {

    //TODO: Create a universal Scrollbar
    //TODO: Add a No Actors Component
    return (
        <div className={`${className}`}>
            <p className="font-semibold text-xl text-neutral-100 mb-3">Actors</p>
            <div className="flex flex-row overflow-x-auto md:scrollbar-thin md:scrollbar-track-gray-100 md:scrollbar-thumb-red-600 pb-5 md:ml-2 md:mr-2">
                <Suspense fallback={<ActorSkeletons />}>
                    <CastWidgetContent ID={ID} mediaType={mediaType} />
                </Suspense>
            </div>
        </div>
    )
}

async function CastWidgetContent({ ID, mediaType }: { ID: string, mediaType: string }) {
    const castData = await getCastData(ID, mediaType);
    const showMore = castData!.cast.length > 10 || castData!.crew.length > 0 ? true : false;
    return (
        <Fragment>
            {castData!.cast.map((cast: Cast, index: number) => {
                if (index <= 10)
                    return (
                        <div key={cast.id} title={cast.name} className="grid auto-cols-max ml-1 mr-1 p-2 hover:bg-neutral-900 rounded-sm transition-all delay-50">
                            <Link href={`/person/${cast.id}`} passHref>
                                <Image
                                    src={cast.profile_path ? cast.profile_path : Placeholder.src}
                                    alt={`Image of ${cast.name}`}
                                    loader={PosterLoader}
                                    width={125}
                                    height={187}
                                    className="rounded-md w-[125px] h-[187px]" />
                                <div className="w-[125px] mt-1 truncate overflow-x-hidden text-neutral-100">
                                    <p className="truncate">{cast.name}</p>
                                    <p className="truncate text-neutral-400">{cast.character}</p>
                                </div>
                            </Link>
                        </div>
                    );
            })}
            {showMore ?
                <Link href={`/${mediaType.toLowerCase()}/${castData!.id}/credits`} className="flex items-center justify-center text-neutral-100 rounded-sm font-medium text-lg hover:bg-neutral-900 pl-12 pr-12" passHref>
                    Show more
                </Link> :
                <Fragment />
            }
        </Fragment>
    );
}

export const ActorSkeletons = () => {
    return (
        <IndexWidgetScrollBar className="flex flex-row overflow-x-auto gap-2">
            <ActorSkeleton />
            <ActorSkeleton />
            <ActorSkeleton />
            <ActorSkeleton />
            <ActorSkeleton />
            <ActorSkeleton />
            <ActorSkeleton />
            <ActorSkeleton />
            <ActorSkeleton />
            <ActorSkeleton />
        </IndexWidgetScrollBar>
    )
}

const ActorSkeleton = () => (
    <div className="mb-2 p-2">
        <div className="w-[125px] h-[187px] animate-pulse bg-gray-100 rounded-md mb-4"></div>
        <div className="w-24 h-3 animate-pulse bg-gray-100 rounded-md mb-2"></div>
        <div className="w-20 h-3 animate-pulse bg-gray-200 rounded-md"></div>
    </div>
)

export const Error = () => {
    return (
        <div className="flex flex-col justify-center items-center w-auto h-[252px]">
            <p className="font-semibold text-3xl text-neutral-100">Something went wrong...</p>
            <p className="font-semibold text-lg text-neutral-400">Please check your internet connection.</p>
        </div>
    )
}