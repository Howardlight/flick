import type { Metadata } from 'next'
import Navbar from '../components/Navbar';
import UpcomingMovies from '../components/Index/UpcomingMovies/UpcomingMovies';
import PopularTV from '../components/Index/PopularTV';
import SearchBar from '../components/Index/SearchBar';
import PopularMovies from '../components/Index/PopularMovies/PopularMovies';

export const metadata: Metadata = {
  title: "Home - Flick"
}

export default async function Home() {
  //TODO: Port all Endpoints to their layout

  return (
    <main className='mb-10 bg-black'>
      <div className='max-md:h-[500px] h-[700px] w-auto bg-hero'>
        <div className='max-md:h-[500px] h-[700px] w-auto backdrop-blur-sm flex flex-col'>
          <Navbar />

          <div className='flex flex-col justify-center flex-grow '>
            <p className="self-center mb-5 text-xl font-semibold text-neutral-100">All kinds of Shows that you&apos;ll enjoy</p>
            <SearchBar />
          </div>

        </div>
      </div>
      <div className='border-t-4 border-red-600 border-solid md:border-t-8'>


        <PopularMovies />
        <UpcomingMovies className='mt-10' />
        <PopularTV className='mt-10' />
      </div>
    </main>
  )
}