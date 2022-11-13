import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Fragment } from 'react';
import { NextSeo } from 'next-seo';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <NextSeo
        title="Project Movies"
        description="Explore the latest and most popular movies using Project Movies! Discover details never heard of about your favorite actors! Find your next favorite TV Show using Project Movies!"
        canonical="https://project-movies.vercel.app"
        openGraph={{
          url: 'https://project-movies.vercel.app',
          title: 'Project Movies',
          description: "Explore the latest and most popular movies using Project Movies! Discover details never heard of about your favorite actors! Find your next favorite TV Show using Project Movies!",
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
          site_name: 'Project Movies',
        }}
      />
      <Component {...pageProps} />
    </Fragment>
  )
    ;
}

export default MyApp
