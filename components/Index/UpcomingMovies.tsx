"use client";

import { UpcomingResponse, UpcomingResult } from '../../types/GetUpcomingTypes';
import React from 'react';
import moment from 'moment';
import { IndexWidget } from './IndexWidgetBase';

export default function UpcomingMovies({className, upcomingMovies}: {className?: string, upcomingMovies: UpcomingResponse}) {
  return (
    <IndexWidget className={`${className}`} title='Upcoming Movies' key={"upcoming-movies"}>
      <IndexWidget.Scrollbar>
      {
        upcomingMovies!.results.map((item: UpcomingResult) => {
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
    </IndexWidget>
  )
}