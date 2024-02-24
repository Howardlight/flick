import { Suspense } from 'react';
import { PopularResponse } from '../../../types/GetPopularMoviesTypes';
import { IndexWidget, IndexWidgetSkeletons } from '../../Index/IndexWidgetBase';
import PopularMoviesWidget from './PopularMoviesWidget';
import { logError } from '../../../utils/utils';

async function getPopularMovies(page: number) {
  try {
    const req = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`,
      { next: { revalidate: 90000 } }
    );
    const data: PopularResponse = await req.json();

    return data;
  } catch (error: any) {
    logError(error, "getPopularMovies");
    return null;
  }
}

//TODO: Simplify this interface
// remove the content function if it is not needed
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
  return <PopularMoviesWidget popularMovies={popularMovies} />;
}