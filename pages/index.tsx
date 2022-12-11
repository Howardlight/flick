import type { NextPage } from 'next'
import Head from 'next/head'
import { Navbar } from '../components/Navbar';
import { PopularMovies } from '../components/Index/PopularMovies';
import { UpcomingMovies } from '../components/Index/UpcomingMovies';
import { FormEventHandler, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { PopularTV } from '../components/Index/PopularTV';
import { NextSeo } from 'next-seo';
import moment from 'moment';
import useUser from '../useUser';

interface Token {
  status_message: string
  request_token: string,
  success: boolean,
  status_code: number
}

interface accessToken {
  status_message: string,
  access_token: string,
  sucess: boolean,
  status_code: number,
  account_id: string
}


const Home: NextPage = () => {

  const router = useRouter();

  const { user } = useUser({
    redirectTo: "",
  });

  console.log("user: ", user);


  return (
    <div>
      <NextSeo
        title='Home'
      />
      <Navbar />
      <main className='bg-black mb-10'>
        <button onClick={() => login(router)}>Log in</button>
        <button onClick={() => logout(router)}>Log out</button>
        <div className='flex flex-col justify-center h-[50vh] bg-black'>
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

async function logout(router: NextRouter) {
  await fetch("/api/logout");
  router.reload();
}

async function login(router: NextRouter) {
  const req = await fetch("/api/login/requestToken", {
    method: "POST",
    body: JSON.stringify({
      redirect_to: "localhost:3000",
    })
  });
  const data: Token = await req.json();
  console.log(data);

  if (req.status == 200) window.open(`https://www.themoviedb.org/auth/access?request_token=${data.request_token}`, "_blank");

  setTimeout(async function () {
    const accessTokenReq = await fetch(`/api/login/accessToken`, {
      method: "POST",
      body: JSON.stringify({
        request_token: data.request_token
      })
    })
    const accessTokenData = await accessTokenReq.json();
    console.log(accessTokenData);

    if (accessTokenReq.status == 200) {

      const v3Req = await fetch("/api/login/convertV4SessionToV3", {
        method: "POST",
        body: JSON.stringify({
          access_token: accessTokenData.access_token
        })
      })
      const v3ReqData = await v3Req.json();
      console.log(v3ReqData);



      const loginReq = await fetch("/api/login/login", {
        method: "POST",
        body: JSON.stringify({
          session_id: v3ReqData.session_id
        })
      })

    }




  }, 15000);
}

//TODO: Finish autocomplete in the future
function SearchBar() {

  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    // console.log(event, query);
    router.push(`/search/${query}/1`);
  }


  return (
    <form onSubmit={handleSubmit} className='flex flex-row ml-4 mr-4 mb-1 md:justify-center'>
      <input
        type="text"
        className="block grow md:grow-0 px-4 py-2 md:w-[80%] rounded-tl-sm rounded-bl-sm text-red-600 bg-white"
        id="query"
        placeholder="..."
        onChange={(e) => setQuery(e.target.value)}
        required
      />
      <button
        className="transition-all delay-50 px-4 text-white bg-red-600 rounded-tr-sm rounded-br-sm hover:bg-red-800"
        type={"submit"}
      >
        Search
      </button>
    </form>
  );
}

export default Home;