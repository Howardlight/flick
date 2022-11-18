import { NextSeo } from "next-seo";
import { Fragment } from "react";
import { Navbar } from "../components/Navbar";
import Magnifier from "../components/SVGComponents/Magnifier";

export default function Custom404() {
    return (
        <Fragment>
            <NextSeo
                title="404 - Project Movies"
            />
            <div className="w-[100vw] h-[100vh] flex flex-col">
                <Navbar />
                <main className="flex flex-col justify-center items-center grow">
                    <Magnifier fill={"rgb(115 115 115)"} viewBox="0 0 128 128" height={128} width={128} />
                    <p className="text-3xl text-neutral-200">404</p>
                    <p className="text-lg text-neutral-500">It seems what you&apos;re looking for is not found</p>
                </main>
            </div>
        </Fragment>
    );
};
