import { Navbar } from "../../../components/Navbar";
import { Fragment } from "react";
import { TVShow } from "../../../types/TVShow";
import { CastWidget } from "../../../components/Movie-TV/CastWidget";
import { CreatorWidget } from "../../../components/Movie-TV/CreatorWidget";
import Custom404 from "../../404";
import { NextSeo } from "next-seo";
import { SeasonsWidget } from "../../../components/SeasonsWidget";
import { TVReviews } from "../../../components/Reviews/TVReviews";
import Recommendations from "../../../components/Recommendations/TVRecommendations";
import { Images } from "../../../components/Movie-TV/Images/TVImagesWidget";
import { Overview } from "../../../components/Movie-TV/Overview";
import HydrationWrapper from "../../../components/HydrationWrapper";
import HeroBox from "../../../components/HeroBox/TVShowHeroBox";
import { TVDetailsBox } from "../../../components/DetailsBox/TVShowDetailsBox";

interface TVShowPageParams {
    id: string;
}

export default async function TVShowPage({ params }: { params: TVShowPageParams }) {
    const { data, requestStatus, mediaType } = await getData(params.id);
    console.log(data);

    //TODO:Create a loading page;
    if (requestStatus != 200) return <Custom404 />;
    return (
        <HydrationWrapper>
            <head>
                <title>{`${data.name} - Flick`}</title>
            </head>
            <div className="lg:border-b-2 border-red-600" style={{ backgroundImage: `linear-gradient(to right, rgba(24, 26, 27, 0.84), rgba(0,0,0, 0.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path})` }}>
                <Navbar />

                <HeroBox data={data} />
            </div>
            <div className="m-3">

                <TVDetailsBox data={data} />

                <Overview overview={data.overview} />

                <br />

                <SeasonsWidget seasons={data.seasons} TVID={data.id} />

                <CastWidget id={data.id} mediaType={mediaType} className={"mt-4"} />

                {data.created_by.length >= 1 ? <CreatorWidget creators={data.created_by} className={"mt-4"} /> : <div />}

                <Images id={data.id} />

                <Recommendations id={data.id} />

                {data.vote_count > 1 ? <TVReviews tvID={data.id} className={"mt-10"} /> : <Fragment />}

            </div>
        </HydrationWrapper>
    )
}


async function getData(id: string) {
    let data: TVShow;
    const request = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    data = await request.json();

    return {
        data: data,
        mediaType: "TV",
        requestStatus: request.status,
    }
}