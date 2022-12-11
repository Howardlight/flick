import { Fragment, ReactElement } from "react";
import useSWR, { SWRResponse } from "swr";
import fetcher from "../../Fetcher";
import { GetPopularTV, TVResult } from "../../types/GetPopularTVTypes";
import { IndexWidgetBase, IndexWidgetContentWrapper, IndexWidgetError, IndexWidgetScrollBar, IndexWidgetSkeletons, Metrics } from "./IndexWidgetBase";
import Placeholder from "../../assets/MovieSVG.svg";
import Link from "next/link";
import Image from "next/image";
import { PosterLoader } from "../../PosterLoader";
import styles from "../../styles/IndexWidget.module.css";

export const PopularTV = ({ className }: { className?: string }): ReactElement => {
    return (
        <IndexWidgetBase className={`${className}`} title="Popular Shows" key={"popular-shows"}>
            <PopularTVContent />
        </IndexWidgetBase>
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
        <IndexWidgetScrollBar>
            {data.results.map((tv: TVResult) => {
                return (
                    <IndexWidgetContentWrapper key={tv.id} mediaType="tv" resultID={tv.id}>
                        <Image
                            src={tv.poster_path ? tv.poster_path : Placeholder.src}
                            loader={PosterLoader}
                            alt={`${tv.name} poster`}
                            width={250}
                            height={375}
                            loading="lazy"
                            className={["rounded-md h-[375px]", styles.autoWidth].join(" ")}
                        />
                        <div className='flex flex-col justify-end grow mt-2 max-w-[250px]'>
                            <p className='font-medium text-lg ml-2 pb-2 text-gray-100 truncate'>{tv.name}</p>
                            <Metrics vote_average={tv.vote_average} />
                        </div>
                    </IndexWidgetContentWrapper>
                )
            })}
        </IndexWidgetScrollBar>
    )
}