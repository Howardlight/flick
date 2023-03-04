import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext, Fragment, useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter, Router, NextRouter } from 'next/router';
import useUser from '../useUser';
import { User } from '../types/User';
import NProgress from "nprogress";
import Head from 'next/head';

const defaultUserContext: User = {
  isLoggedIn: false
}

function useNProgressBar(router: Router) {
  useEffect(() => {

    router.events.on("routeChangeStart", (url) => {
      NProgress.start()
    });

    router.events.on("routeChangeComplete", (url) => {
      NProgress.done()
    });

    // Router.events.on("routeChangeError", (url) => {
    //   NProgress.done()
    // });

  }, [router])
}

export const UserContext = createContext<User>(defaultUserContext);
function MyApp({ Component, pageProps }: AppProps) {

  // ProgressBar when routing
  useNProgressBar(Router as unknown as Router);


  // Get Session/Cookie if present
  const { user } = useUser({
    redirectTo: "",
  });
  // console.log("user: ", user);

  return (
    <Fragment>
      

      <UserContext.Provider value={user!}>
        <Component {...pageProps} />
      </UserContext.Provider>

    </Fragment>
  )
    ;
}

export default MyApp
