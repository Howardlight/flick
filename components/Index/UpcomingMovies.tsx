import { UpcomingResponse, UpcomingResult } from '../../types/GetUpcomingTypes';
import React, { Suspense } from 'react';
import moment from 'moment';
import { IndexWidget, IndexWidgetSkeletons } from './IndexWidgetBase';

async function getUpcomingMovies(page: number) {
  const req = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`,
    { cache: "no-store" }
  );
  const data: UpcomingResponse = await req.json();

  return data;
}


export default function UpcomingMovies({ className }: { className?: string }) {
  return (
    <IndexWidget className={`${className}`} title='Upcoming Movies' key={"upcoming-movies"}>
      <IndexWidget.Scrollbar>
        <Suspense fallback={<IndexWidgetSkeletons />}>
          <UpcomingMoviesContent />
        </Suspense>
      </IndexWidget.Scrollbar>
    </IndexWidget>
  )
}

async function UpcomingMoviesContent() {
  const upcomingMovies = await getUpcomingMovies(1);
  return upcomingMovies!.results.map((item: UpcomingResult) => {
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