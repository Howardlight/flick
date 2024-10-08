import { UpcomingResponse } from '../../../types/GetUpcomingTypes';
import React, { Suspense } from 'react';
import { IndexWidget, IndexWidgetSkeletons } from '../../Index/IndexWidgetBase';
import UpcomingMoviesWidget from './UpcomingMoviesWidget';
import constants from '../../../utils/constants';

//TODO: Simplify this interface
// remove the content function if it is
async function getUpcomingMovies(page: number) {
  const req = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`,
    { next: { revalidate: constants.cacheRevalidation.landing } }
  );
  const data: UpcomingResponse = await req.json();

  return data;
}


export default function UpcomingMovies({ className }: Readonly<{ className?: string }>) {
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
  return <UpcomingMoviesWidget upcomingMovies={upcomingMovies} />
}