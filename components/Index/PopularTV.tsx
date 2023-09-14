import { Suspense } from "react";
import { GetPopularTV, TVResult } from "../../types/GetPopularTVTypes";
import { IndexWidget, IndexWidgetSkeletons } from "./IndexWidgetBase";

async function getPopularTV(page: number) {
    const req = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`,
        { cache: "no-store" }
    );
    const data: GetPopularTV = await req.json();

    return data;
}

export default function PopularTV({ className }: { className: string }) {
    return (
        <IndexWidget className={`${className}`} title="Popular Shows" key={"popular-shows"}>
            <IndexWidget.Scrollbar>
                <Suspense fallback={<IndexWidgetSkeletons />}>
                    <PopularTVContent />
                </Suspense>
            </IndexWidget.Scrollbar>
        </IndexWidget>
    )
}

async function PopularTVContent() {
    const popularTV = await getPopularTV(1);

    return popularTV!.results.map((tv: TVResult) => {
        return (
            <IndexWidget.Wrapper title={tv.name} key={tv.id} mediaType="tv" resultID={tv.id}>
                <IndexWidget.Poster title={tv.name} url={tv.poster_path} />
                <div className='flex flex-col justify-end grow mt-2 max-w-[250px]'>
                    <p className='font-medium text-lg ml-2 pb-2 text-gray-100 truncate'>{tv.name}</p>
                    <IndexWidget.Metrics vote_average={tv.vote_average} />
                </div>
            </IndexWidget.Wrapper>
        )
    })
}