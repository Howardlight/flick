import "../styles/globals.css";
// import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]/route";
import Provider from "./context/client-provider";
import { Analytics } from "@vercel/analytics/react";
import 'swiper/css';
import 'swiper/css/navigation';

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    // const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
                <meta name="apple-mobile-web-app-title" content="Flick" />
                <meta name="application-name" content="Flick" />
                <meta name="msapplication-TileColor" content="#2d89ef" />
                <meta name="theme-color" content="#000000" />

                <meta name="description" content="Explore the latest and most popular movies using Flick! Discover details never heard of about your favorite actors! Find your next favorite TV Show using Project Movies!" />
                <link rel="canonical" href="https://flick.vercel.app" />


                <meta property="og:url" content="https://flick.vercel.app" />
                <meta property="og:title" content="Flick - Home" />
                <meta property="og:description" content="Explore the latest and most popular movies using Flick! Discover details never heard of about your favorite actors! Find your next favorite TV Show using Project Movies!" />
                <meta property="og:site_name" content="Flick" />

                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                {/* Base Image for OpenGraph */}
                {/* <meta property="og:image" content="https://example.com/ogp.jpg" />
                <meta property="og:image:secure_url" content="https://secure.example.com/ogp.jpg" />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:image:width" content="400" />
                <meta property="og:image:height" content="300" />
                <meta property="og:image:alt" content="A shiny red apple with a bite taken out" /> */}
            </head>
            <body>
                {/* <Provider session={session}> */}
                {children}
                {/* </Provider> */}
                <Analytics />
            </body>
        </html>
    );
}