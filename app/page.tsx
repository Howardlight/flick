import type { Metadata, NextPage } from 'next'
import { PopularResponse } from '../types/GetPopularMoviesTypes';
import { Navbar } from '../components/Navbar';
import UpcomingMovies from '../components/Index/UpcomingMovies';
import PopularTV from '../components/Index/PopularTV';
import SearchBar from '../components/Index/SearchBar';
import { Fragment, Suspense } from 'react';
import { UpcomingResponse } from '../types/GetUpcomingTypes';
import { GetPopularTV } from '../types/GetPopularTVTypes';
import { IndexWidget, IndexWidgetSkeletons } from '../components/Index/IndexWidgetBase';
import PopularMovies from '../components/Index/PopularMovies';


export const metadata: Metadata = {
  title: "Home - Flick"
}

async function getUpcomingMovies(page: number) {
  const req = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`,
    { cache: "no-store" }
  );
  const data: UpcomingResponse = await req.json();

  return data;
}

async function getPopularTV(page: number) {
  const req = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`,
    { cache: "no-store" }
  );
  const data: GetPopularTV = await req.json();

  return data;
}


export default async function Home() {
  const upcomingMovies = await getUpcomingMovies(1);
  const popularTV = await getPopularTV(1);
  //TODO: h-[50vh] does not seem to work for some reason, find out why and fix it
  //TODO: you cannot declare <head></head> inside the body of a server component, it must be declared in a layout
  // Port all Endpoints to their layout

  return (
    <Fragment>
      <Navbar />
      <main className='bg-black mb-10'>
        <div style={{ height: "50vh" }} className='flex flex-col justify-center bg-black'>
          <p className="font-semibold text-neutral-100 self-center text-xl mb-5">All kinds of Shows that you&apos;ll enjoy</p>
          <SearchBar />
        </div>

        <PopularMovies />
        <UpcomingMovies className='mt-10' />

        {/* <Suspense fallback={<IndexWidgetSkeletons />}>
          <PopularTV className='mt-10' popularTV={popularTV} />
        </Suspense> */}
      </main>
    </Fragment>
  )
}