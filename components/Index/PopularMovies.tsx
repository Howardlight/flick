import { Suspense } from 'react';
import { PopularResponse, PopularResult } from '../../types/GetPopularMoviesTypes';
import { IndexWidget, IndexWidgetSkeletons } from './IndexWidgetBase';
import { logError } from '../../utils';

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
      <IndexWidget.Scrollbar>
        <Suspense fallback={<IndexWidgetSkeletons />}>
          <PopularMoviesContent />
        </Suspense>
      </IndexWidget.Scrollbar>
    </IndexWidget>
  )
}

async function PopularMoviesContent() {
  const popularMovies = await getPopularMovies(1);


  //TODO:Push scrollbar into PopularMoviesContent and IndexWidgetSKeletons
  // because when Component fails, Error loads inside scrollbar, looks terrible
  try {
    return popularMovies!.results.map((item: PopularResult) => {
      return (
        <IndexWidget.Wrapper title={item.title} mediaType='movie' resultID={item.id} key={`popular-movies-${item.id}`}>
          <IndexWidget.Poster title={item.title} url={item.poster_path} />

          <div className='flex flex-col grow justify-end mt-2 max-w-[250px]'>
            <p className='font-medium text-lg ml-2 pb-2 text-gray-100 truncate'>{item.title}</p>
            <IndexWidget.Metrics vote_average={item.vote_average} />
          </div>

        </IndexWidget.Wrapper>
      );
    });



  } catch (error: any) {
    logError(error, "<PopularMoviesContent />")
    return <p>Could not fetch Popular Movies</p>
  }
}