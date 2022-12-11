import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext, Fragment } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import useUser from '../useUser';
import { User } from '../types/User';

const defaultUserContext: User = {
  isLoggedIn: false
}

export const UserContext = createContext<User>(defaultUserContext);
function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();
  const { user } = useUser({
    redirectTo: "",
  });
  console.log("user: ", user);


  return (
    <Fragment>
      <NextSeo
        title="Flick"
        description="Explore the latest and most popular movies using Flick! Discover details never heard of about your favorite actors! Find your next favorite TV Show using Project Movies!"
        canonical="https://flick.vercel.app"
        openGraph={{
          url: 'https://flick.vercel.app',
          title: 'Flick',
          description: "Explore the latest and most popular movies using Flick! Discover details never heard of about your favorite actors! Find your next favorite TV Show using Project Movies!",
          images: [
            {
              url: 'https://www.example.com/og-image01.jpg',
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/jpeg',
            },
            {
              url: 'https://www.example.com/og-image02.jpg',
              width: 900,
              height: 800,
              alt: 'Og Image Alt Second',
              type: 'image/jpeg',
            },
            { url: 'https://www.example.com/og-image03.jpg' },
            { url: 'https://www.example.com/og-image04.jpg' },
          ],
          site_name: 'Flick',
        }}
      />

      <UserContext.Provider value={user!}>
        <Component {...pageProps} />
      </UserContext.Provider>

    </Fragment>
  )
    ;
}

export default MyApp
