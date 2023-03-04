import { GetServerSidePropsContext } from "next";
import { Movie } from "../../../types/Movie";
import { Navbar } from "../../../components/Navbar";
import { CastWidget } from "../../../components/Movie-TV/CastWidget";
import Custom404 from "../../../app/404";
import { NextSeo } from "next-seo";
import { isInPast } from "../../search/[...query]";
import { Fragment, ReactElement, Suspense, useState } from "react";
import { MovieReviews } from "../../../components/Reviews/MovieReviews";
import MainPageMetrics from "../../../components/Movie-TV/MainPageMetrics";
import { Recommendations } from "../../../components/Recommendations/MovieRecommendations";
import { useMediaQuery } from "react-responsive";
import { DetailsBox } from "../../../components/DetailsBox";
import { DesktopView } from "../../../components/Movie-TV/Views/DesktopView";
import { MobileView } from "../../../components/Movie-TV/Views/MobileView";
import { Overview, useRenderComplete } from "../../tv/[id]";
import { Images } from "../../../components/Movie-TV/Images/MovieImagesWidget";
import Spinner from "../.././../components/SVGComponents/Spinner";

//TODO: Add case for when The movie is not released yet
export default function MoviePage({ data, mediaType, requestStatus }: { data: Movie, mediaType: string, requestStatus: number }) {

    // Explanation:
    // When dealing with Dates, the backend compares the HTML of the frontend, and since there's a delay 
    // between the 2, the backend thinks the UI mismatched, so to solve this, we create a loading bar until the frontend
    // fully loads, THEN we render the page;
    const [renderComplete, setRenderComplete] = useState(false);
    useRenderComplete(setRenderComplete);

    const isDesktop = useMediaQuery({ minWidth: 992 });

    function HeroBox(): ReactElement {
        if (isDesktop) return (
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
        );

        return (
            <MobileView>
                <MobileView.Poster url={data.poster_path} name={data.title} />
                <MobileView.Wrapper>
                    <MobileView.Wrapper.Description name={data.title} tagline={data.tagline} />
                    <MobileView.Wrapper.Genres genres={data.genres} />
                </MobileView.Wrapper>
            </MobileView>
        );
    }

    function MovieDetailsBox(): ReactElement {
        if (isDesktop) return <Fragment />;

        return (
            <Fragment>
                <DetailsBox>
                    <DetailsBox.FirstAiredDate firstAirDate={data.release_date} />
                    <DetailsBox.Runtime runtime={data.runtime} />
                    <DetailsBox.Budget budget={data.budget} />
                    <DetailsBox.Revenue revenue={data.revenue} />
                </DetailsBox>
                {isInPast(data.release_date) ? <MainPageMetrics vote_average={data.vote_average} vote_count={data.vote_count} className="mt-5" /> : <Fragment />}
                <br />
            </Fragment>
        );
    }

    if (requestStatus != 200) return <Custom404 />;
    if (!renderComplete) return <LoadingSpinner />;

    return (
        <div>
            <NextSeo title={`${data.title} - Flick`} />
            <div className="lg:border-b-2 border-red-600" style={{ backgroundImage: `linear-gradient(to right, rgba(24, 26, 27, 0.84), rgba(0,0,0, 0.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path})` }}>
                <Navbar />

                <HeroBox />
            </div>
            <div className="m-3">

                <MovieDetailsBox />

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


export function LoadingSpinner() {
    return (
        <div className="w-[100vw] h-[100vh] flex items-center justify-center">
            <div className="animate-spin w-1/4">
                <Spinner />
            </div>
        </div>
    );
};

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