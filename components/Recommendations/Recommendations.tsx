import { MovieRecResponse, TVRecResponse } from "../../types/GetRecommendationsTypes";
import { RecommendationsCard, RecommendationsError, RecommendationSkeletons } from "./RecommendationsBase";
import { Suspense } from "react";
import { TVShow } from "../../types/TVShow";
import MediaType from "../../types/MediaType";
import { Movie } from "../../types/Movie";

async function getRecommendations(ID: number, mediaType: MediaType) {
    let req, data: TVRecResponse | MovieRecResponse;
    try {
        switch (mediaType) {
            case MediaType.tv:
                req = await fetch(`https://api.themoviedb.org/3/tv/${ID}/recommendations?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`);
                data = await req.json();

                return data;

            case MediaType.movie:
                req = await fetch(`https://api.themoviedb.org/3/movie/${ID}/recommendations?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`);
                data = await req.json();

                return data;
            default:
                return null;
        }
    } catch (error) {
        console.error(`[getRecommendations][ERROR]: `, error);
        return null;
    }
}

export default function Recommendations({ id, mediaType }: { id: number, mediaType: MediaType }) {
    return (
        <div className="mt-4 flex flex-col">
            <p className="font-semibold text-neutral-100 text-xl mb-3">Recommendations</p>
            <Suspense fallback={<RecommendationSkeletons />}>
                <RecommendationsContent id={id} mediaType={mediaType} />
            </Suspense >
        </div >
    );
};

async function RecommendationsContent({ id, mediaType }: { id: number, mediaType: MediaType }) {
    const data = await getRecommendations(id, mediaType);

    if (data == null) return <RecommendationsError />;
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-items-center">
            {
                mediaType == MediaType.tv ?
                    (data as TVRecResponse).results.map((tv, index) => {
                        if (index < 12) return <TVCard tv={tv} index={index} key={tv.id} />;
                        return;
                    })
                    : (data as MovieRecResponse).results.map((movie, index) => {
                        if (index < 12) return <MovieCard movie={movie} index={index} key={movie.id} />;
                        return;
                    })
            }
        </div>
    );

}

function MovieCard({ movie, index }: { movie: Movie, index: number }) {
    return (
        <RecommendationsCard id={movie.id} index={index} mediaType={"movie"}>
            <RecommendationsCard.Poster url={movie.poster_path} title={movie.title} />
            <RecommendationsCard.Description airDate={movie.release_date} title={movie.title} />
        </RecommendationsCard>
    )
};

function TVCard({ tv, index }: { tv: TVShow, index: number }) {
    return (
        <RecommendationsCard id={tv.id} index={index} mediaType={"tv"}>
            <RecommendationsCard.Poster url={tv.poster_path} title={tv.name} />
            <RecommendationsCard.Description airDate={tv.first_air_date} title={tv.name} />
        </RecommendationsCard>
    )
};