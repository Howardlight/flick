import { Suspense } from 'react';
import { PopularResponse } from '../../../types/GetPopularMoviesTypes';
import { IndexWidget, IndexWidgetSkeletons } from '../IndexWidgetBase';
import PopularMoviesWidget from './PopularMoviesWidget';
import { logError } from '../../../utils';

async function getPopularMovies(page: number) {
  try {
    const req = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`,
      { cache: "no-store" }
    );
    const data: PopularResponse = await req.json();

    return data;
  } catch (error: any) {
    logError(error, "getPopularMovies");
    return null;
  }
}

export default function PopularMovies() {
  return (
    <IndexWidget title={`Popular Movies`} key={"popular-movies"}>
      <Suspense fallback={<IndexWidgetSkeletons />}>
        <PopularMoviesContent />
      </Suspense>
    </IndexWidget>
  )
}

async function PopularMoviesContent() {
  const popularMovies = await getPopularMovies(1);

  try {
    return <PopularMoviesWidget popularMovies={popularMovies} />

  } catch (error: any) {
    logError(error, "<PopularMoviesContent />")
    return <p>Could not fetch Popular Movies</p>
  }
}