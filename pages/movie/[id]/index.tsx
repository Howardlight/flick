import { GetServerSidePropsContext } from "next";
import { Movie } from "../../../types/Movie";
import Image from "next/image";
import { PosterLoader } from "../../../PosterLoader";
import { Navbar } from "../../../components/Navbar";
import moment from "moment";
import { CastWidget } from "../../../components/Movie-TV/CastWidget";
import Custom404 from "../../404";
import { NextSeo } from "next-seo";
import Placeholder from "../../../assets/MovieSVG.svg";
import { isReleased } from "../../search/[...query]";
import { Fragment } from "react";
import { MovieReviews } from "../../../components/Reviews/MovieReviews";
import MainPageMetrics from "../../../components/Movie-TV/MainPageMetrics";
import useSWR, { SWRResponse } from "swr";
import fetcher from "../../../Fetcher";
import { MovieRecResponse } from "../../../types/GetMovieRecommendationsTypes";
import Link from "next/link";

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
                {isReleased(data.release_date) ? <MainPageMetrics vote_average={data.vote_average} vote_count={data.vote_count} styles="mt-5" /> : <Fragment />}
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

                <Recommendations id={data.id} />

                {
                    data.vote_count > 1 ?
                        <MovieReviews movieID={data.id} />
                        : <Fragment />}
            </div>

        </div>
    )
}

const Recommendations = ({ id }: { id: number }) => {

    const { data, error }: SWRResponse<MovieRecResponse, Error> = useSWR(`/api/Movie/getRecommendations/${id}`, fetcher);
    console.log(data);

    //TODO: EXPERIMENT: Try adding tags to each movie

    if (!data && !error) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    if (data?.total_results == 0) return <Fragment />;
    //TODO: Add Element saying "No Recommendations or something along it"

    return (
        <div className="mt-4">
            <p className="font-semibold text-neutral-100 text-2xl mb-3">Recommendations</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-items-center">
                {data?.results.map((movie, index) => {
                    if (index < 6) return (
                        <div className="flex flex-col justify-center w-[187px] mb-5 p-3 hover:bg-neutral-900" key={`${movie.id}-${index}`}>
                            <Link href={`/movie/${movie.id}`} passHref>
                                <a>
                                    <Image
                                        src={movie.poster_path ? movie.poster_path : Placeholder.src}
                                        alt={movie.title}
                                        loader={PosterLoader}
                                        width={187}
                                        height={280}
                                        className="rounded-sm"
                                    />
                                    <div className="mt-1">
                                        <p className="truncate">{movie.title}</p>
                                        <p className="text-neutral-400 truncate">{movie.release_date ? moment(movie.release_date).format("LL") : ""}</p>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    )
                })}
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
            mediaType: "Movie",
            requestStatus: request.status,
        }
    }
}