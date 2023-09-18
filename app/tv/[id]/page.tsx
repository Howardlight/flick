import { Navbar } from "../../../components/Navbar";
import { Fragment } from "react";
import { TVShow } from "../../../types/TVShow";
import { CastWidget } from "../../../components/Movie-TV/CastWidget";
import { CreatorWidget } from "../../../components/Movie-TV/CreatorWidget";
import NotFound from "../../not-found";
import { SeasonsWidget } from "../../../components/SeasonsWidget";
import Recommendations from "../../../components/Recommendations/Recommendations";
import { Overview } from "../../../components/Movie-TV/Overview";
import HeroBox from "../../../components/HeroBox/TVShowHeroBox";
import { TVDetailsBox } from "../../../components/DetailsBox/TVShowDetailsBox";
import { Metadata } from "next";
import { Images } from "../../../components/Movie-TV/Images/ImagesWidget";
import MediaType from "../../../types/MediaType";
import ReviewsWidget from "../../../components/Reviews/ReviewsWidget";

interface TVShowPageParams {
    id: string;
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

export async function generateMetadata({ params }: { params: TVShowPageParams }): Promise<Metadata> {
    const { data } = await getData(params.id);
    return { title: `${data.name} - Flick` };
}

export default async function TVShowPage({ params }: { params: TVShowPageParams }) {
    const { data, requestStatus, mediaType } = await getData(params.id);
    // console.log(data);

    //TODO:Create a loading page;
    if (requestStatus != 200) return <NotFound />;
    return (
        <Fragment>
            <div className="lg:border-b-2 border-red-600" style={{ backgroundImage: `linear-gradient(to right, rgba(24, 26, 27, 0.84), rgba(0,0,0, 0.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path})` }}>
                <Navbar />

                <HeroBox data={data} />
            </div>
            <div className="m-3">

                <TVDetailsBox data={data} />

                <Overview overview={data.overview} />

                <br />

                <SeasonsWidget seasons={data.seasons} TVID={data.id} />

                <CastWidget ID={data.id.toString()} mediaType={mediaType} className={"mt-4"} />

                {data.created_by.length >= 1 ? <CreatorWidget creators={data.created_by} className={"mt-4"} /> : <div />}

                <Images id={data.id} mediaType={MediaType.tv} />

                <Recommendations id={data.id} mediaType={MediaType.tv} />

                {data.vote_count > 1 ? <ReviewsWidget ID={data.id} mediaType={MediaType.tv} /> : <Fragment />}

            </div>
        </Fragment>
    )
}