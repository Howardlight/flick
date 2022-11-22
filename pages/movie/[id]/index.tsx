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
                {
                    data.vote_count > 1 ?
                        <MovieReviews movieID={data.id} />
                        : <Fragment />}
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