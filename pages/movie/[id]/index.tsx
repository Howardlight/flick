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
import { isInPast } from "../../search/[...query]";
import { Fragment, useState } from "react";
import { MovieReviews } from "../../../components/Reviews/MovieReviews";
import MainPageMetrics from "../../../components/Movie-TV/MainPageMetrics";
import { Recommendations } from "../../../components/Recommendations/MovieRecommendations";
import { Default, Desktop, Mobile } from "../../../Breakpoints";
import { useMediaQuery } from "react-responsive";
import { DetailsBox } from "../../../components/DetailsBox";
import { DesktopView } from "../../../components/Movie-TV/Views/DesktopView";
import { MobileView } from "../../../components/Movie-TV/Views/MobileView";
import { Overview, useRenderComplete } from "../../tv/[id]";
import useSWR, { SWRResponse } from "swr";
import { Images, Backdrop } from "../../../types/Images";
import fetcher from "../../../Fetcher";

//TODO: Add case for when The movie is not released yet
export default function MoviePage({ data, mediaType, requestStatus }: { data: Movie, mediaType: string, requestStatus: number }) {

    // Explanation:
    // When dealing with Dates, the backend compares the HTML of the frontend, and since there's a delay 
    // between the 2, the backend thinks the UI mismatched, so to solve this, we create a loading bar until the frontend
    // fully loads, THEN we render the page;
    const [renderComplete, setRenderComplete] = useState(false);
    useRenderComplete(setRenderComplete);

    const isDesktop = useMediaQuery({ minWidth: 992 });

    if (requestStatus != 200) return <Custom404 />;
    if (!renderComplete) return <p>Loading....</p>; //Change this
    return (
        <div>
            <NextSeo
                title={`${data.title} - Flick`}
            />
            <div className="lg:border-b-2 border-red-600" style={{ backgroundImage: `linear-gradient(to right, rgba(24, 26, 27, 0.84), rgba(0,0,0, 0.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path})` }}>
                <Navbar />

                {isDesktop ?
                    <DesktopView>
                        <DesktopView.Poster name={data.title} url={data.poster_path} />
                        <DesktopView.Wrapper>
                            <div>
                                <DesktopView.Wrapper.Description name={data.title} tagline={data.tagline} className="mb-5" />
                                <div>
                                    {/* <DesktopView.Wrapper.AirDates firstAirDate={data.first_air_date} lastAirDate={data.last_air_date} /> */}
                                    {/* <DesktopView.Wrapper.EpNumber epNum={data.number_of_episodes} /> */}
                                </div>
                            </div>
                            <div>
                                <DesktopView.Wrapper.Genres genres={data.genres} />
                                <DesktopView.Wrapper.Rating firstAirDate={data.release_date} voteAverage={data.vote_average} voteCount={data.vote_count} />
                            </div>
                        </DesktopView.Wrapper>
                    </DesktopView>
                    : <MobileView>
                        <MobileView.Poster url={data.poster_path} name={data.title} />
                        <MobileView.Wrapper>
                            <MobileView.Wrapper.Description name={data.title} tagline={data.tagline} />
                            <MobileView.Wrapper.Genres genres={data.genres} />
                        </MobileView.Wrapper>
                    </MobileView>}

            </div>
            <div className="m-3">

                {isDesktop ?
                    <Fragment />
                    : <Fragment>
                        <DetailsBox>
                            <DetailsBox.FirstAiredDate firstAirDate={data.release_date} />
                            <DetailsBox.Runtime runtime={data.runtime} />
                            <DetailsBox.Budget budget={data.budget} />
                            <DetailsBox.Revenue revenue={data.revenue} />
                        </DetailsBox>
                        {isInPast(data.release_date) ? <MainPageMetrics vote_average={data.vote_average} vote_count={data.vote_count} className="mt-5" /> : <Fragment />}
                        <br />
                    </Fragment>}

                <Overview overview={data.overview} />

                <br />

                <CastWidget id={data.id} mediaType={mediaType} />

                <Images id={data.id} />

                <Recommendations id={data.id} />
                {data.vote_count > 1 ? <MovieReviews movieID={data.id} /> : <Fragment />}
            </div>

        </div>
    )
}

function Images({ id }: { id: number }) {
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

    if (!data && !error) return <p>Loading...</p>;
    if (error) return <p>Error Occurred</p>;
    return (
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 gap-x-6 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
                {data?.backdrops.map((image: Backdrop, index: number) => {
                    if (index < 8) return <BlurImage key={`Poster-${index}`} image={image} />;
                    return;
                })}
            </div>
        </div>
    )
}

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function BlurImage({ image }: { image: Backdrop }) {
    const [isLoading, setLoading] = useState(true)

    return (
        <a href={""} className="group">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <Image
                    alt=""
                    src={image.file_path ? image.file_path : Placeholder.src}
                    loader={PosterLoader}
                    layout="fill"
                    objectFit="cover"
                    className={cn(
                        'duration-700 ease-in-out group-hover:opacity-75',
                        isLoading
                            ? 'scale-110 blur-2xl grayscale'
                            : 'scale-100 blur-0 grayscale-0'
                    )}
                    onLoadingComplete={() => setLoading(false)}
                />
            </div>
            <h3 className="mt-4 text-base font-medium text-neutral-100">{Math.round(image.vote_average * 10) / 10}</h3>
            <p className="mt-1 text-sm text-neutral-400">{image.vote_count} Reviews</p>
        </a>
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