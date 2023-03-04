import type { NextPage } from 'next'
import { Navbar } from '../components/Navbar';
import { PopularMovies } from '../components/Index/PopularMovies';
import { UpcomingMovies } from '../components/Index/UpcomingMovies';
import { PopularTV } from '../components/Index/PopularTV';
import SearchBar from '../components/Index/SearchBar';

const Home: NextPage = () => {

  //TODO: h-[50vh] does not seem to work for some reason, find out why and fix it

  return (
    <div>
      <head>
        <title>Home</title>
      </head>
      <Navbar />
      <main className='bg-black mb-10'>
        <div style={{ height: "50vh" }} className='flex flex-col justify-center bg-black'>
          <p className="font-semibold text-neutral-100 self-center text-xl mb-5">All kinds of Shows that you&apos;ll enjoy</p>
          <SearchBar />
        </div>

        <PopularMovies />
        <UpcomingMovies className={"mt-10"} />
        <PopularTV className='mt-10' />
      </main>
    </div>
  )
}

export default Home;