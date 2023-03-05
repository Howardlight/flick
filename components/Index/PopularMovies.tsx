"use client";

import useSWR, { SWRResponse } from 'swr';
import { PopularResponse, PopularResult } from '../../types/GetPopularMoviesTypes';
import fetcher from '../../Fetcher';
import { IndexWidget, IndexWidgetError, IndexWidgetSkeletons, Metrics } from './IndexWidgetBase';
import { Suspense } from 'react';

export const PopularMovies = ({ className }: { className?: string }): React.ReactElement => {
  return (
    <IndexWidget className={`${className}`} title={`Popular Movies`} key={"popular-movies"}>
      <PopularWidgetContent />
    </IndexWidget>
  );
};


const PopularWidgetContent = (): React.ReactElement => {
  const { data, error }: SWRResponse<PopularResponse, Error> = useSWR('/api/Movie/1/1/getPopularMovies', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  if (!data && !error) return <IndexWidgetSkeletons />;
  if (error) return <IndexWidgetError />;
  return (
    <IndexWidget.Scrollbar>
      {data!.results.map((item: PopularResult) => {
        return (
          <IndexWidget.Wrapper title={item.title} mediaType='movie' resultID={item.id} key={`popular-movies-${item.id}`}>
            <IndexWidget.Poster title={item.title} url={item.poster_path} />

            <div className='flex flex-col grow justify-end mt-2 max-w-[250px]'>
              <p className='font-medium text-lg ml-2 pb-2 text-gray-100 truncate'>{item.title}</p>
              <IndexWidget.Metrics vote_average={item.vote_average} />
            </div>

          </IndexWidget.Wrapper>
        );
      })}
    </IndexWidget.Scrollbar>
  );
};

