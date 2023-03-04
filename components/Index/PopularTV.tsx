"use client";

import { ReactElement } from "react";
import useSWR, { SWRResponse } from "swr";
import fetcher from "../../Fetcher";
import { GetPopularTV, TVResult } from "../../types/GetPopularTVTypes";
import { IndexWidget, IndexWidgetError, IndexWidgetSkeletons, Metrics } from "./IndexWidgetBase";

export const PopularTV = ({ className }: { className?: string }): ReactElement => {
    return (
        <IndexWidget className={`${className}`} title="Popular Shows" key={"popular-shows"}>
            <PopularTVContent />
        </IndexWidget>
    );
}

const PopularTVContent = () => {
    const { data, error }: SWRResponse<GetPopularTV, Error> = useSWR("/api/TV/getPopularTV/1", fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    // console.log(data);
    if (!data && !error) return <IndexWidgetSkeletons />
    if (!data) return <IndexWidgetError />;
    return (
        <IndexWidget.Scrollbar>
            {data.results.map((tv: TVResult) => {
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
    )
}