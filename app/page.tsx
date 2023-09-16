import type { Metadata, NextPage } from 'next'
import { Navbar } from '../components/Navbar';
import UpcomingMovies from '../components/Index/UpcomingMovies';
import PopularTV from '../components/Index/PopularTV';
import SearchBar from '../components/Index/SearchBar';
import { Fragment } from 'react';
import PopularMovies from '../components/Index/PopularMovies';


export const metadata: Metadata = {
  title: "Home - Flick"
}

export default async function Home() {
  //TODO: h-[50vh] does not seem to work for some reason, find out why and fix it
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
        <PopularTV className='mt-10' />

      </main>
    </Fragment>
  )
}