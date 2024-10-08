import Link from "next/link";
import React, { ReactNode } from "react";
import Image from "next/image";
import { PosterLoader } from "../../utils/PosterLoader";
import Placeholder from "../../assets/MovieSVG.svg";
import styles from "../../styles/IndexWidget.module.css";

export const Metrics = ({ vote_average }: { vote_average: number }) => {

    const percentage = Math.round(vote_average * 10).toString();

    return (
        <div className='flex flex-row items-center justify-between mr-2 ml-2 gap-3'>
            <div className='h-4 w-full bg-neutral-800 rounded-sm flex items-center'>
                <span className={`inline-block relative bg-red-600 h-2 ml-1 mr-2`} style={{ width: `${percentage}%` }}></span>
            </div>
            <p className='font-semibold text-lg text-red-600'>{percentage}%</p>
        </div>

    )
}

export const IndexWidgetSkeletons = () => {
    return (
        <div className='flex flex-row overflow-x-scroll md:scrollbar-thin md:scrollbar-track-gray-100 md:scrollbar-thumb-red-600 pb-5 md:ml-2 md:mr-2'>
            <IndexWidgetSkeleton />
            <IndexWidgetSkeleton />
            <IndexWidgetSkeleton />
            <IndexWidgetSkeleton />
            <IndexWidgetSkeleton />
        </div>
    );
};

const IndexWidgetSkeleton = () => {
    return (
        <div className='ml-2 mr-2 p-2 h-[463px]'>
            <div className='animate-pulse w-[250px] h-[375px] bg-gray-100 rounded-md'></div>
            <div className='animate-pulse w-4/6 h-3 mb-3 bg-gray-100 rounded-md mt-4'></div>
            <div className='animate-pulse w-3/6 h-3 bg-gray-100 rounded-md mt-2 mb-3'></div>
        </div>
    );
};

export const IndexWidgetError = () => {
    return (
        <div className='w-auto h-[451px] flex flex-col items-center justify-center'>
            <p className='font-semibold text-2xl text-neutral-100'>Something&apos;s not right.</p>
            <p className='font-base text-lg text-neutral-400'>Please check your internet connection</p>
        </div>
    )
}

const IndexWidgetContentWrapper = ({ title, resultID, mediaType, children }: { title: string, resultID: number, mediaType: string, children: ReactNode }) => {
    return (
        <div key={resultID} title={title} className="grid auto-cols-max mr-2 ml-2 p-2 rounded-sm w-[266px] h-[463px] text-xsm transition-all delay-10 hover:bg-neutral-900">
            <Link href={`/${mediaType.toLowerCase()}/${resultID}`} className="flex flex-col" passHref>
                {children}
            </Link>
        </div>
    );
}

export const IndexWidgetScrollBar = ({ className, children }: { className?: string, children: ReactNode }) => {
    return (
        <div className={['flex flex-row overflow-x-scroll md:scrollbar-thin md:scrollbar-track-gray-100 md:scrollbar-thumb-red-600 pb-5 md:ml-2 md:mr-2', className].join(" ")}>
            {children}
        </div>
    );
}

const Poster = ({ url, title }: { url: string | null, title: string }) => {
    return (
        <Image
            src={url ? url : Placeholder.src}
            loader={PosterLoader}
            alt={`${title} poster`}
            width={250}
            height={375}
            loading="lazy"
            className={["rounded-md h-[375px]", styles.autoWidth].join(" ")}
        />
    )
}

const IndexWidget = ({ className, title, children }: { className?: string, title: string, children: React.ReactNode }): React.ReactElement => {
    return (
        <div className={`${className}`}>
            <h1 className='m-3 font-semibold text-3xl text-gray-100'>{title}</h1>
            {children}
        </div>
    );
};

IndexWidget.Wrapper = IndexWidgetContentWrapper;
IndexWidget.Scrollbar = IndexWidgetScrollBar;
IndexWidget.Poster = Poster;
IndexWidget.Metrics = Metrics;
export { IndexWidget };