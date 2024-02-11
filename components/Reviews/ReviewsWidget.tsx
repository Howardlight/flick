import { Fragment, Suspense } from "react";
import moment from "moment";
import { ReviewResponse } from "../../types/ReviewResponse";
import { ImageWithFallback } from "../ImageWithFallback";
import Comment from "./Comment";
import {
    NoReviewsFound,
    ReviewError,
    Reviews,
    ReviewSkeletons,
} from "./Reviews";

import Placeholder from "../../assets/MovieSVG.svg";
import { IconStarFilled, IconStar } from "@tabler/icons-react";
import MediaType from "../../types/MediaType";

async function getReviews(ID: number, mediaType: MediaType) {
    let req, data: ReviewResponse, page = 1;
    switch (mediaType) {
        case MediaType.movie:
            req = await fetch(
                `https://api.themoviedb.org/3/movie/${ID}/reviews?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`
            );
            data = await req.json();

            return data;
        case MediaType.tv:
            req = await fetch(
                `https://api.themoviedb.org/3/tv/${ID}/reviews?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`
            );
            data = await req.json();

            return data;

        default:
            console.error(
                `[getImages][ERROR] Default case Detected! this error should not occur!`
            );
            return undefined;
    }
}

interface ReviewsContentProps {
    ID: number;
    mediaType: MediaType;
};

async function ReviewsContent(props: Readonly<ReviewsContentProps>) {
    const reviews = await getReviews(props.ID, props.mediaType);

    if (!reviews) return <ReviewError />;
    if (reviews.results.length == 0) return <NoReviewsFound />;
    return (
        <Fragment>
            {reviews.results.map((review, index) => (

                <div className="flex flex-col gap-4 mt-8 mb-8" key={`${review.id}-${index}`}>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row justify-start items-center gap-2">
                            <ImageWithFallback
                                alt={`${review.author}'s Avatar`}
                                src={review.author_details.avatar_path ?? Placeholder.src}
                                fallback={Placeholder.src}
                                width={64}
                                height={64}
                                className={"rounded-md w-16 h-16"}
                            />
                            <div className="flex flex-col">
                                <p className="text-ellipsis w-36 overflow-x-hidden whitespace-nowrap">{review.author}</p>
                                <p className="text-base font-medium text-neutral-400">
                                    {moment(review.created_at).format("LL")}
                                </p>
                            </div>
                        </div>
                        {review.author_details.rating ? (
                            <div className="flex flex-row items-center justify-center text-2xl font-semibold gap-2">
                                <p className="text-2xl font-bold">
                                    {review.author_details.rating} / 10
                                </p>
                                <IconStarFilled size={48} stroke={2} />
                            </div>
                        ) : (
                            <div className="flex flex-row items-center justify-center">
                                <IconStar size={48} stroke={2} />
                            </div>
                        )}
                    </div>
                    <Comment className="md:px-2" text={review.content} />
                </div>
            ))}
        </Fragment>
    );
}

interface ReviewsWidgetProps {
    ID: number;
    mediaType: MediaType;
    className?: string;
}

export default function ReviewsWidget(props: Readonly<ReviewsWidgetProps>) {
    //TODO: Fully add Pages to functions
    // you click on show more button or it automatically fetches them as you approach the bottom of the page
    // and more Comments are loaded ON TOP OF THE CURRENT COMMENTS
    //TODO: Change the Fill of the Star SVG, It is too bright of a color for the Theme
    // const [page, setPage] = useState(1);
    // const { data, error }: SWRResponse<ReviewResponse, Error> = useSWR(`/api/Movie/${movieID}/${page}/getMovieReviews`, fetcher);

    return (
        <Reviews className={["mt-10", `${props.className}`].join(" ")}>
            <Suspense fallback={<ReviewSkeletons />}>
                <ReviewsContent ID={props.ID} mediaType={props.mediaType} />
            </Suspense>
        </Reviews>
    );
}
