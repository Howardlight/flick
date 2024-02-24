import { Suspense } from "react";
import { GetPopularTV } from "../../../types/GetPopularTVTypes";
import { IndexWidget, IndexWidgetSkeletons } from "../../Index/IndexWidgetBase";
import PopularTVWidget from "./PopularTVWidget";
import constants from "../../../utils/constants";

async function getPopularTV(page: number) {
    const req = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`,
        { next: { revalidate: constants.cacheRevalidation.landing } }
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
    return <PopularTVWidget popularTV={popularTV} />
}