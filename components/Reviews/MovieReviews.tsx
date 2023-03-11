"use client";
import Image from "next/image";
import moment from "moment";
import { Fragment, useState } from "react";
import useSWR, { SWRResponse } from "swr";
import fetcher from "../../Fetcher";
import { ReviewResponse } from "../../types/ReviewResponse";
import { AvatarLoader } from "../../AvatarLoader";
import { ImageWithFallback } from "../ImageWithFallback";
import { Comment } from "./Comment";
import { NoReviewsFound, ReviewError, Reviews, ReviewSkeletons } from "./Reviews";

import Placeholder from "../../assets/MovieSVG.svg";
import Star from "../../assets/Star.svg";
import { Default, Mobile } from "../../Breakpoints";

export const MovieReviews = ({ movieID }: { movieID: number }) => (
    <Reviews className="mt-10" >
        <MovieReviewsContent movieID={movieID} />
    </Reviews>
)



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
    const { data, error }: SWRResponse<ReviewResponse, Error> = useSWR(`/api/Movie/${movieID}/${page}/getMovieReviews`, fetcher);

    //TODO: Port This Component to use the new API Endpoint, for some reason it currently doesn't work

    // console.log(data);
    if (!data && !error) return <ReviewSkeletons />;
    if (error) return <ReviewError />;
    if (data?.results.length == 0) return <NoReviewsFound />;
    return (
        <div>
            <Default>
                <Fragment>
                    {data!.results.map((review, index) => {
                        return (
                            <Fragment key={`${review.id}-${index}`}>
                                <div className="flex flex-row gap-4 mt-6 mb-6" key={`${review.id}-${index}`}>
                                    <div className="w-auto h-auto mt-2">
                                        <ImageWithFallback
                                            alt={`${review.author}'s Avatar`}
                                            src={review.author_details.avatar_path ? review.author_details.avatar_path : Placeholder.src}
                                            fallback={Placeholder.src}

                                            //@ts-ignore
                                            loader={AvatarLoader}
                                            width={64}
                                            height={64}
                                            className={"rounded-md w-16 h-16"} />
                                    </div>


                                    <div className="w-5/6 border p-2 rounded-md border-neutral-400">
                                        <div className="flex flex-row justify-between h-16">
                                            <div className="flex flex-col">
                                                <p>{review.author}</p>
                                                <p className="text-base font-medium text-neutral-400">{moment(review.created_at).format("LL")}</p>
                                            </div>
                                            {review.author_details.rating ?
                                                <div className="flex flex-row items-center justify-center mr-4 text-2xl font-semibold gap-2">
                                                    <p className="text-lg">{review.author_details.rating} / 10</p>
                                                    <Image
                                                        src={Star.src}
                                                        alt={"Star"}
                                                        width={32}
                                                        height={32} />
                                                </div>
                                                : <Fragment />}
                                        </div>
                                        <Comment className="" text={review.content} />
                                    </div>
                                </div>
                                {/* <div className="flex items-center justify-center">
                                    <hr className="solid w-4/6 bg-neutral-400 text-neutral-400"></hr>
                                </div> */}
                            </Fragment>
                        );
                    })}
                </Fragment>
            </Default>
            <Mobile>
                <Fragment>
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
                                            <p className="text-lg">{review.author_details.rating} / 10</p>
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
                </Fragment>
            </Mobile>

        </div>
    );
};
