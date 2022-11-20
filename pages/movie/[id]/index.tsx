import { GetServerSidePropsContext } from "next";
import { Movie } from "../../../types/Movie";
import Image from "next/image";
import { PosterLoader } from "../../../PosterLoader";
import { Navbar } from "../../../components/Navbar";
import moment from "moment";
import { CastWidget } from "../../../components/CastWidget";
import Custom404 from "../../404";
import { NextSeo } from "next-seo";
import Placeholder from "../../../assets/MovieSVG.svg";
import { isReleased } from "../../search/[...query]";
import { Fragment, useEffect, useState } from "react";
import useSWR, { SWRResponse } from "swr";
import fetcher from "../../../Fetcher";
import { ReviewResponse } from "../../../types/ReviewResponse";
import { AvatarLoader } from "../../../AvatarLoader";
import { ImageWithFallback } from "../../../components/ImageWithFallback";
import Star from "../../../assets/Star.svg";

//TODO: Add case for when The movie is not released yet
export default function MoviePage({ data, mediaType, requestStatus }: { data: Movie, mediaType: string, requestStatus: number }) {
    // console.log(data);

    //TODO: Add recommended Movies
    //TODO: OR Add Similar Movies
    if (requestStatus != 200) return <Custom404 />;
    return (
        <div>
            <NextSeo
                title={`${data.title} - Project Movies`}
            />
            <div style={{ backgroundImage: `linear-gradient(to right, rgba(24, 26, 27, 0.84), rgba(0,0,0, 0.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path})` }}>
                <Navbar />
                <div className="flex flex-col justify-center items-center p-5">
                    <Image
                        src={data.poster_path ? data.poster_path : Placeholder.src}
                        loader={PosterLoader}
                        alt={`${data.title} Poster`}
                        width={250}
                        height={375}
                        className="rounded-md h-[375px] w-[250px]"
                    />
                    <div>
                        <div className="flex flex-col grow mt-5">
                            <p className="font-bold text-3xl self-center text-neutral-100">{data.title}</p>
                            <p className="text-sm self-center text-neutral-300">{data.tagline}</p>
                        </div>
                        <div className="flex flex-row mt-5 gap-3 justify-center flex-wrap">
                            {data.genres.map((genre) => (
                                <div key={`genre-${genre.id}`} className="text-base text-neutral-300 font-medium bg-red-600 p-2 rounded-md">
                                    {genre.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="m-3">

                {isReleased(data.release_date) ? <Metrics data={data} styles="mb-5" /> : <Fragment />}
                <div className="border-red-600 border-2 p-2 rounded-md">
                    <p className="font-medium text-lg">{isReleased(data.release_date) ? `Released on ${moment(data.release_date).format("LL")}` : `Will be released on ${moment(data.release_date).format("LL")}`}</p>
                    <div className="text-lg font-medium">
                        <p className="inline text-red-600">{data.runtime} Minutes</p>
                        <p className="inline"> of runtime</p>
                    </div>

                    {data.budget ?
                        <div className="text-lg font-medium">
                            <p className="inline text-red-600">{`${data.budget / 1000000}M$`}</p>
                            <p className="inline"> budget</p>
                        </div>
                        : <Fragment />
                    }
                    {
                        data.revenue ?
                            <div className="text-lg font-medium">
                                <p className="inline text-red-600">{`${(data.revenue / 1000000).toFixed(2)}M$`}</p>
                                <p className="inline"> revenue</p>
                            </div>
                            : <Fragment />
                    }
                </div>
                <br />
                {data.overview ?
                    <Fragment>
                        <p className="font-semibold text-2xl text-neutral-100 mb-3">Overview</p>
                        <p className="text-neutral-300">{data.overview}</p>
                    </Fragment>
                    : <Fragment />
                }
                <br />

                <CastWidget id={data.id} mediaType={mediaType} />
                {data.vote_count > 1 ? <Reviews movieID={data.id} /> : <Fragment />}
            </div>

        </div>
    )
}

const Reviews = ({ movieID }: { movieID: number }) => {
    const [page, setPage] = useState(1);
    const { data, error }: SWRResponse<ReviewResponse, Error> = useSWR(`/api/getmoviereviews/${movieID}/${page}`, fetcher);

    console.log(data);
    if (!data && !error) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
    return (
        <div>
            {
                data!.results.map((review, index) => {
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
                                    className={"rounded-md"}
                                />
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
                                            height={32}
                                            style={{ fill: "" }}
                                        />
                                    </div>
                                    : <Fragment />
                                }
                            </div>
                            <Comment className="text-neutral-300 mt-4 ml-1" text={review.content} />
                        </div>
                    )
                })
            }
        </div>
    );
}

//TODO: Check Performance and use callback or memoization
const Comment = ({ text, className }: { text: string, className?: string }): React.ReactElement => {


    // logic clarification: is showMoreButton needed?
    // yes, substring and button. 
    // no, dump the bio
    const [showMore, setShowMore] = useState(false);
    useEffect(() => {
        if (text.length > 250) setShowMore(true);

    }, [text.length])

    if (!text || text == "") return <Fragment></Fragment>;
    return (
        <div className={`${className}`}>
            <p className="inline">{showMore ? `${text.substring(0, 250)}` : text}</p>
            {showMore ? <div className="flex items-center justify-center z-10 relative bottom-6 backdrop-blur-sm hover:cursor-pointer hover:contrast-150" onClick={() => setShowMore(false)}>Show more</div> : <Fragment />}
        </div>
    )
}



const Metrics = ({ data, styles }: { data: Movie, styles: string }) => {

    const percentage = Math.round(data.vote_average * 10).toString();

    return (
        <div className={`${styles}`}>
            <div className='h-4 w-full bg-neutral-900 rounded-sm flex items-center'>
                <span className={`inline-block relative bg-red-600 h-2 ml-1 mr-2`} style={{ width: `${percentage}%` }}></span>
            </div>
            <div className="flex flex-row justify-between ml-1 mt-2 mr-1">
                <p className='font-bold text-2xl text-red-600'>{percentage}%</p>
                <div className="flex flex-row gap-1 items-center">
                    <p className="font-semibold text-2xl text-red-600 inline">{data.vote_count}</p>
                    <p className="font-medium inline text-red-600 text-xl">Reviews</p>
                </div>
            </div>
        </div>

    )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    let data: Movie;

    const request = await fetch(`https://api.themoviedb.org/3/movie/${context!.params!.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    data = await request.json();

    return {
        props: {
            data: data,
            mediaType: "movie",
            requestStatus: request.status,
        }
    }
}