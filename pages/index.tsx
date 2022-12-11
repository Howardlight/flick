import type { NextPage } from 'next'
import Head from 'next/head';
import { Navbar } from '../components/Navbar';
import { PopularMovies } from '../components/Index/PopularMovies';
import { UpcomingMovies } from '../components/Index/UpcomingMovies';
import { FormEventHandler, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { PopularTV } from '../components/Index/PopularTV';
import { NextSeo } from 'next-seo';
import useUser from '../useUser';
import { accessToken, requestToken, V4ToV3Request } from '../types/Auth';

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
        <button onClick={() => handleLogin(router)}>Log in</button>
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

async function handleLogin(router: NextRouter) {


  // Request a request Token
  // This token has no real value,
  const reqTokenReq = await getRequestToken();
  if (reqTokenReq.status != 200) {
    //TODO: Finish this
    return;
  };

  // once the token has been created, the user will be prompted to verify it
  const requestTokenData = await reqTokenReq.json();
  if (reqTokenReq.status == 200) window.open(`https://www.themoviedb.org/auth/access?request_token=${requestTokenData.request_token}`, "_blank");

  // Give the User Time to approve the token, otherwise Logging in will fail
  setTimeout(async function () {

    // after the specified time, get the access token using the request token
    const accessTokenReq = await getAccessToken(requestTokenData);
    if (accessTokenReq.status != 200) {
      //TODO: Finish this

      return;
    }

    // convert the v4 token to v3, so we can use it
    const accessTokenData = await accessTokenReq.json();
    const v3Req = await convertToV3(accessTokenData);
    if (v3Req.status != 200) {
      //TODO: Finish this

      return;
    }

    // once converted, pass the session_id to a cookie with
    // the login function
    const v3ReqData = await v3Req.json();
    const loginReq = await login(v3ReqData);

  }, 15000);
}

async function getRequestToken() {
  const req = await fetch("/api/auth/requestToken", {
    method: "POST",
    body: JSON.stringify({
      redirect_to: "localhost:3000",
    })
  });
  return req;
}

async function getAccessToken(requestTokenData: requestToken) {
  const accessTokenReq = await fetch(`/api/auth/accessToken`, {
    method: "POST",
    body: JSON.stringify({
      request_token: requestTokenData.request_token
    })
  })
  return accessTokenReq;
}

async function convertToV3(accessTokenData: accessToken) {
  const v3Req = await fetch("/api/auth/convertV4SessionToV3", {
    method: "POST",
    body: JSON.stringify({
      access_token: accessTokenData.access_token
    })
  })
  return v3Req;
}

async function login(v3ReqData: V4ToV3Request) {
  const loginReq = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      session_id: v3ReqData.session_id
    })
  })
  return loginReq;
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