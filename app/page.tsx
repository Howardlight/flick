import type { Metadata, NextPage } from 'next'
import { PopularResponse } from '../types/GetPopularMoviesTypes';
import { Navbar } from '../components/Navbar';
import { PopularMovies } from '../components/Index/PopularMovies';
import UpcomingMovies from '../components/Index/UpcomingMovies';
import { PopularTV } from '../components/Index/PopularTV';
import SearchBar from '../components/Index/SearchBar';
import HydrationWrapper from '../components/HydrationWrapper';
import { Suspense } from 'react';
import { UpcomingResponse } from '../types/GetUpcomingTypes';


export const metadata: Metadata = {
  title: "Home - Flick"
}

async function getPopularMovies(page: number) {
  const req = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`, 
    { cache: "no-store" }
  );
  const data: PopularResponse = await req.json();

  return data;
}

async function getUpcomingMovies(page: number) {
  const req = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`,
    { cache: "no-store" }
  );
  const data: UpcomingResponse = await req.json();

  return data;
}


export default async function Home() {
  const popularMovies = await getPopularMovies(1);
  const upcomingMovies = await getUpcomingMovies(1);
  //TODO: h-[50vh] does not seem to work for some reason, find out why and fix it
  //TODO: you cannot declare <head></head> inside the body of a server component, it must be declared in a layout
  // Port all Endpoints to their layout

  return (
    <HydrationWrapper>
      <Navbar />
      <main className='bg-black mb-10'>
        <div style={{ height: "50vh" }} className='flex flex-col justify-center bg-black'>
          <p className="font-semibold text-neutral-100 self-center text-xl mb-5">All kinds of Shows that you&apos;ll enjoy</p>
          <SearchBar />
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <PopularMovies popularMovies={popularMovies} />
        </Suspense>
        <Suspense fallback={<p>Loading...</p>}>
          <UpcomingMovies className={"mt-10"} upcomingMovies={upcomingMovies} />
        </Suspense>
        <PopularTV className='mt-10' />
      </main>
    </HydrationWrapper>
  )
}