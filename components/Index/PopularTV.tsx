"use client";

import { GetPopularTV, TVResult } from "../../types/GetPopularTVTypes";
import { IndexWidget } from "./IndexWidgetBase";

export default function PopularTV({ className, popularTV }: { className: string, popularTV: GetPopularTV }) {
    return (
        <IndexWidget className={`${className}`} title="Popular Shows" key={"popular-shows"}>
            <IndexWidget.Scrollbar>
                {popularTV!.results.map((tv: TVResult) => {
                    return (
                        <IndexWidget.Wrapper title={tv.name} key={tv.id} mediaType="tv" resultID={tv.id}>
                            <IndexWidget.Poster title={tv.name} url={tv.poster_path} />
                            <div className='flex flex-col justify-end grow mt-2 max-w-[250px]'>
                                <p className='font-medium text-lg ml-2 pb-2 text-gray-100 truncate'>{tv.name}</p>
                                <IndexWidget.Metrics vote_average={tv.vote_average} />
                            </div>
                        </IndexWidget.Wrapper>
                    )
                })}
            </IndexWidget.Scrollbar>
        </IndexWidget>
    )
}