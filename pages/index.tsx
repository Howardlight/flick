import type { NextPage } from 'next'
import { Navbar } from '../components/Navbar';
import { PopularMovies } from '../components/Index/PopularMovies';
import { UpcomingMovies } from '../components/Index/UpcomingMovies';
import { FormEventHandler, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { PopularTV } from '../components/Index/PopularTV';
import { NextSeo } from 'next-seo';
import { accessToken, requestToken, V4ToV3Request } from '../types/Auth';

const Home: NextPage = () => {

  return (
    <div>
      <NextSeo
        title='Home'
      />
      <Navbar />
      <main className='bg-black mb-10'>
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

export async function logout(router: NextRouter) {
  await fetch("/api/auth/logout");
  router.reload();
}

interface LoginResponse {
  occuredAt: string,
  status: number
}

export async function handleLogin(router: NextRouter): Promise<LoginResponse> {
  return new Promise(async (resolve, reject) => {

    // Request a request Token
    // This token has no real value,
    const reqTokenReq = await getRequestToken();
    if (reqTokenReq.status != 200) {

      return resolve({ occuredAt: "RequestToken", status: reqTokenReq.status });
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

        return resolve({ occuredAt: "Access Token", status: accessTokenReq.status });
      }

      // convert the v4 token to v3, so we can use it
      const accessTokenData = await accessTokenReq.json();
      const v3Req = await convertToV3(accessTokenData);
      if (v3Req.status != 200) {

        return resolve({ occuredAt: "V3ToV4", status: v3Req.status });
      }

      // once converted, pass the session_id to a cookie with
      // the login function
      const v3ReqData = await v3Req.json();
      const loginReq = await login(v3ReqData, router);

      return resolve({ occuredAt: "Login", status: loginReq.status });
    }, 15000);
  })
}

async function getRequestToken() {
  const req = await fetch("/api/auth/requestToken", {
    method: "POST",
    body: JSON.stringify({
      redirect_to: "",
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

async function login(v3ReqData: V4ToV3Request, router: NextRouter) {
  const loginReq = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      session_id: v3ReqData.session_id
    })
  })

  if (loginReq.status == 200) router.reload();
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