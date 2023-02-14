import useSWR, { SWRResponse } from "swr";
import fetcher from "../../../Fetcher";
import { Backdrop, Images } from "../../../types/Images";
import BlurImage from "./BlurImage";
import { Widget } from "./Images";
import { LoadingSkeletons } from "./TVImagesWidget";

export function Images({ id }: { id: number }) {
    const { data, error }: SWRResponse<Images, Error> = useSWR(`/api/Movie/getImages/${id}`, fetcher);

    console.log(data);


    //TODO: Improve Blur Image CSS
    //TODO: Refactor
    //TODO: Sort Images and pick the ones with the most reviews
    //TODO: Add a lighthouse
    //TODO: Create a skeleton
    //TODO: Add this component to TV


    //TODO: Crazy good tailwind modifiers here Check them out
    // more info: https://www.youtube.com/watch?v=BSoRXk1FIw8

    if (!data && !error) return <LoadingSkeletons />;
    if (error) return <p>Error Occurred</p>;
    return (
        <Widget>
            <Widget.Title title="Images" />
            <Widget.ImagesWrapper>
                {data?.posters.map((image: Backdrop, index: number) => {
                    if (index < 8) return <BlurImage key={`Poster-${index}`} image={image} />;
                    return;
                })}
            </Widget.ImagesWrapper>
        </Widget>
    )
}
