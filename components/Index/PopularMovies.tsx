"use client";
import { PopularResponse, PopularResult } from '../../types/GetPopularMoviesTypes';
import { IndexWidget } from './IndexWidgetBase';

export default function PopularMovies({ className, popularMovies }: { className?: string, popularMovies: PopularResponse }) {
  return (
    <IndexWidget className={`${className}`} title={`Popular Movies`} key={"popular-movies"}>
      <IndexWidget.Scrollbar>
        {popularMovies!.results.map((item: PopularResult) => {
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
    </IndexWidget>
  );
}