import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { PosterLoader } from "../../../PosterLoader";
import { Navbar } from "../../../components/Navbar";
import moment from "moment";
import Placeholder from "../../../assets/MovieSVG.svg";
import { Dispatch, Fragment as div, Fragment, SetStateAction, useEffect, useState } from "react";
import { TVShow } from "../../../types/TVShow";
import { CastWidget } from "../../../components/Movie-TV/CastWidget";
import { CreatorWidget } from "../../../components/Movie-TV/CreatorWidget";
import Custom404 from "../../404";
import { NextSeo } from "next-seo";
import { SeasonsWidget } from "../../../components/SeasonsWidget";
import { isInPast } from "../../search/[...query]";
import { TVReviews } from "../../../components/Reviews/TVReviews";
import { MainPageMetrics } from "../../../components/Movie-TV/MainPageMetrics";
import Recommendations from "../../../components/Recommendations/TVRecommendations";
import { DetailsBox } from "../../../components/DetailsBox";
import { useMediaQuery } from "react-responsive";
import { MobileView } from "../../../components/Movie-TV/Views/MobileView";
import { DesktopView } from "../../../components/Movie-TV/Views/DesktopView";
import { Images } from "../../../components/Movie-TV/Images/TVImagesWidget";

export const useRenderComplete = (setRenderComplete: Dispatch<SetStateAction<boolean>>) => {
    useEffect(() => {
        setRenderComplete(true);
    }, [setRenderComplete]);
}


export default function TVShowPage({ data, mediaType, requestStatus }: { data: TVShow, mediaType: string, requestStatus: number }) {
    console.log(data);

    // Explanation:
    // When dealing with Dates, the backend compares the HTML of the frontend, and since there's a delay 
    // between the 2, the backend thinks the UI mismatched, so to solve this, we create a loading bar until the frontend
    // fully loads, THEN we render the page;
    const [renderComplete, setRenderComplete] = useState(false);
    useRenderComplete(setRenderComplete);

    const isDesktop = useMediaQuery({ minWidth: 992 });

    //TODO:Create a loading page;

    if (requestStatus != 200) return <Custom404 />;
    if (!renderComplete) return <p>Loading....</p>; //Change this
    return (
        <div>
            <NextSeo
                title={`${data.name} - Flick`}
            />
            <div className="lg:border-b-2 border-red-600" style={{ backgroundImage: `linear-gradient(to right, rgba(24, 26, 27, 0.84), rgba(0,0,0, 0.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path})` }}>
                <Navbar />
                {isDesktop ?
                    <DesktopView>
                        <DesktopView.Poster name={data.name} url={data.poster_path} />
                        <DesktopView.Wrapper>
                            <div>
                                <DesktopView.Wrapper.Description name={data.name} tagline={data.tagline} className="mb-5" />
                                <div>
                                    <DesktopView.Wrapper.AirDates firstAirDate={data.first_air_date} lastAirDate={data.last_air_date} />
                                    <DesktopView.Wrapper.EpNumber epNum={data.number_of_episodes} />
                                </div>
                            </div>
                            <div>
                                <DesktopView.Wrapper.Genres genres={data.genres} />
                                <DesktopView.Wrapper.Rating firstAirDate={data.first_air_date} voteAverage={data.vote_average} voteCount={data.vote_count} />
                            </div>
                        </DesktopView.Wrapper>
                    </DesktopView>
                    : <MobileView>
                        <MobileView.Poster url={data.poster_path} name={data.name} />
                        <MobileView.Wrapper>
                            <MobileView.Wrapper.Description name={data.name} tagline={data.tagline} />
                            <MobileView.Wrapper.Genres genres={data.genres} />
                        </MobileView.Wrapper>
                    </MobileView>}
            </div>
            <div className="m-3">

                {isDesktop ?
                    <Fragment />
                    : <Fragment>
                        <DetailsBox>
                            <DetailsBox.FirstAiredDate firstAirDate={data.first_air_date} />
                            <DetailsBox.LastAiredDate lastAirDate={data.last_air_date} />
                            <DetailsBox.NumOfEpisodes numOfEp={data.number_of_episodes} />
                        </DetailsBox>
                        {isInPast(data.first_air_date) ? <MainPageMetrics vote_average={data.vote_average} vote_count={data.vote_count} className="mt-5" /> : <Fragment />}
                        <br />
                    </Fragment>}

                <Overview overview={data.overview} />

                <br />

                <SeasonsWidget seasons={data.seasons} TVID={data.id} />
                <CastWidget id={data.id} mediaType={mediaType} className={"mt-4"} />
                {data.created_by.length >= 1 ? <CreatorWidget creators={data.created_by} className={"mt-4"} /> : <div />}
                <Images id={data.id} />
                <Recommendations id={data.id} />
                {data.vote_count > 1 ? <TVReviews tvID={data.id} className={"mt-10"} /> : <Fragment />}

            </div>
        </div>
    )
}


export function Overview({ overview }: { overview: string | undefined }) {
    if (overview == undefined || overview.length < 1) return <Fragment />;
    return (
        <div className="">
            <p className="font-semibold text-xl text-neutral-100 mb-3">Overview</p>
            <p className="text-neutral-300">{overview}</p>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let data: TVShow;

    const { id } = context.query;
    const request = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    data = await request.json();

    return {
        props: {
            data: data,
            mediaType: "TV",
            requestStatus: request.status,
        }
    }
}