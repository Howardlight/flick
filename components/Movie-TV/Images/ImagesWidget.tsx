import { Suspense } from "react";
import { Backdrop } from "../../../types/Images";
import BlurImage from "./BlurImage";
import { Widget } from "./Images";
import MediaType from "../../../types/MediaType";

export async function getImages(ID: number, mediaType: MediaType) {
    let req, data;
    switch (mediaType) {
        case MediaType.movie:
            req = await fetch(
                `https://api.themoviedb.org/3/movie/${ID}/images?api_key=${process.env.TMDB_API_KEY}&language=en`,
                { next: { revalidate: 24 * 60 * 60 } }
            );
            data = await req.json();

            return data;
        case MediaType.tv:
            req = await fetch(`https://api.themoviedb.org/3/tv/${ID}/images?api_key=${process.env.TMDB_API_KEY}&language=en`,
                { next: { revalidate: 24 * 60 * 60 } }
            );
            data = await req.json();

            return data;

        default:
            console.error(`[getImages][ERROR] Default case Detected! this error should not occur!`);
            return undefined;
    }
}


export function Images({ id, mediaType }: { id: number, mediaType: MediaType }) {
    //TODO: Improve Blur Image CSS
    //TODO: Refactor
    //TODO: Sort Images and pick the ones with the most reviews
    //TODO: Add a lighthouse
    //TODO: Create a skeleton
    //TODO: Add this component to TV


    //TODO: Crazy good tailwind modifiers here Check them out
    // more info: https://www.youtube.com/watch?v=BSoRXk1FIw8

    // if (!data && !error) return <LoadingSkeletons />;
    // if (error) return <ErrorOccured />;
    return (
        <Widget>
            <Widget.Title title="Images" />
            <Widget.ImagesWrapper>
                <Suspense fallback={<LoadingSkeletons />}>
                    <ImagesContent id={id} mediaType={mediaType} />
                </Suspense>
            </Widget.ImagesWrapper>
        </Widget>
    )
}

async function ImagesContent({ id, mediaType }: { id: number, mediaType: MediaType }) {
    const movieImages = await getImages(id, mediaType);

    return movieImages.posters.map((image: Backdrop, index: number) => {
        if (index < 8) return <BlurImage key={`Poster-${index}`} image={image} />;
        return;
    })
}

//TODO: Move these to a shared library or something
export function LoadingSkeletons() {
    return (
        <Widget>
            <Widget.Title title="Images" />
            <Widget.ImagesWrapper>
                <LoadingImageSkeleton />
                <LoadingImageSkeleton />
                <LoadingImageSkeleton />
                <LoadingImageSkeleton />
                <LoadingImageSkeleton />
                <LoadingImageSkeleton />
                <LoadingImageSkeleton />
                <LoadingImageSkeleton />
            </Widget.ImagesWrapper>
        </Widget>
    );
};

function LoadingImageSkeleton() {
    return (
        <div className="flex flex-col gap-5 mb-5">
            <div className="animate-pulse aspect-w-1 aspect-h-1 w-[163px] h-[245px] overflow-hidden rounded-sm bg-gray-500 xl:aspect-w-7 xl:aspect-h-8" />
            <div className="flex flex-row justify-between">
                <div className="animate-pulse bg-gray-500 h-2 rounded-md w-6/12" />
                <div className="animate-pulse bg-gray-500 h-2 rounded-md w-3/12" />
            </div>
        </div>
    )
}

export function ErrorOccured() {
    return (
        <Widget>
            <Widget.Title title="Images" />
            <div className="w-full h-80 flex flex-col justify-center items-center">
                <p className="text-xl text-neutral-200">Could Not load Images</p>
                <p className="text-neutral-400">Try again later</p>
            </div>
        </Widget>
    );
}