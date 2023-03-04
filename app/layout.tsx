// import '../pages/styles/globals.css';
import "../styles/globals.css";
import type { AppProps } from 'next/app'
import { Fragment, ReactElement } from 'react';
import { NextSeo } from 'next-seo';
import NProgress from "nprogress";
import UserContextProvider from '../components/TopTreeComponents/UserContextProvider';

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode;
}) {


    return (
        <html lang="en">
            {/* <NextSeo
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
            /> */}
            <body>
                <UserContextProvider>
                    {children}
                </UserContextProvider>
            </body>
        </html>
    );
}