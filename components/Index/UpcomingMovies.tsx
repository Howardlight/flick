"use client";

import useSWR, { SWRResponse } from 'swr';
import fetcher from '../../Fetcher';
import { UpcomingResponse, UpcomingResult } from '../../types/GetUpcomingTypes';
import React from 'react';
import moment from 'moment';
import { IndexWidget, IndexWidgetError, IndexWidgetSkeletons } from './IndexWidgetBase';

export const UpcomingMovies = ({ className }: { className?: string }): React.ReactElement => {
  return (
    <IndexWidget className={`${className}`} title='Upcoming Movies' key={"upcoming-movies"}>
      <UpcomingWidgetContent />
    </IndexWidget>
  );
};
const UpcomingWidgetContent = (): React.ReactElement => {
  const { data, error }: SWRResponse<UpcomingResponse, Error> = useSWR("/api/Movie/1/1/getUpcomingMovies", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  if (!data && !error) return <IndexWidgetSkeletons />;
  if (error) return <IndexWidgetError />;
  return (
    <IndexWidget.Scrollbar>
      {
        data!.results.map((item: UpcomingResult) => {
          return (
            <IndexWidget.Wrapper title={item.title} key={`upcoming-movie-${item.id}`} mediaType='movie' resultID={item.id}>
              <IndexWidget.Poster title={item.title} url={item.poster_path} />
              <div className='flex flex-col justify-end grow mt-2 max-w-[250px]'>
                <p className='font-medium text-lg ml-2 pb-2 text-gray-100 truncate'>{item.title}</p>
                <p className='font-medium text-md ml-2 pb-2 text-gray-300 justify-end'>{moment(item.release_date).startOf("day").fromNow()}</p>
              </div>
            </IndexWidget.Wrapper>
          );
        })
      }
    </IndexWidget.Scrollbar>
  );
};

export default UpcomingMovies;