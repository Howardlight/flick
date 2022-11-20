import Image from "next/image";
import moment from "moment";
import Placeholder from "../../../assets/MovieSVG.svg";
import { Fragment, useState } from "react";
import useSWR, { SWRResponse } from "swr";
import fetcher from "../../Fetcher";
import { ReviewResponse } from "../../types/ReviewResponse";
import { AvatarLoader } from "../../AvatarLoader";
import { ImageWithFallback } from "../ImageWithFallback";
import Star from "../../../assets/Star.svg";
import { Comment } from "./Comment";

/* //TODO: Finish this TSDOCE
 * This component calls to the getmoviereviews Endpoint
 * @param param0
 * @returns
 */
export const MovieReviewsContent = ({ movieID }: { movieID: number; }) => {
    //TODO: Fully add Pages to functions
    // you click on show more button or it automatically fetches them as you approach the bottom of the page
    // and more Comments are loaded ON TOP OF THE CURRENT COMMENTS
    //TODO: Change the Fill of the Star SVG, It is too bright of a color for the Theme
    const [page, setPage] = useState(1);
    const { data, error }: SWRResponse<ReviewResponse, Error> = useSWR(`/api/getmoviereviews/${movieID}/${page}`, fetcher);

    console.log(data);
    if (!data && !error)
        return <p>Loading...</p>;
    if (error)
        return <p>Error</p>;
    return (
        <div>
            {data!.results.map((review, index) => {
                return (
                    <div className="bg-neutral-9 rounded-md mt-5 mb-5" key={`${review.id}-${index}`}>
                        <div className="flex flex-row items-center gap-2">
                            <ImageWithFallback
                                alt={`${review.author}'s Avatar`}
                                src={review.author_details.avatar_path ? review.author_details.avatar_path : Placeholder.src}
                                fallback={Placeholder.src}

                                //@ts-ignore
                                loader={AvatarLoader}
                                width={64}
                                height={64}
                                className={"rounded-md"} />
                            <div>
                                <p className="text-lg font-medium">{review.author}</p>
                                <p className="text-base font-medium text-neutral-400">{moment(review.created_at).format("LL")}</p>
                            </div>

                            {review.author_details.rating ?
                                <div className="flex flex-row items-center grow justify-end text-2xl font-semibold gap-2">
                                    <p>{review.author_details.rating} / 10</p>
                                    <Image
                                        src={Star.src}
                                        alt={"Star"}
                                        width={32}
                                        height={32} />
                                </div>
                                : <Fragment />}
                        </div>
                        <Comment className="text-neutral-300 mt-4 ml-1" text={review.content} />
                    </div>
                );
            })}
        </div>
    );
};
