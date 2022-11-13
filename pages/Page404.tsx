import { Navbar } from "../components/Navbar";
import { Fragment } from "react";

export const Page404 = () => {
    return (
        <Fragment>
            <Navbar />
            <main className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
                <p className="text-3xl text-neutral-200">404</p>
                <p className="text-lg text-neutral-500">It seems what you&apos;re looking for is not found</p>
            </main>
        </Fragment>

    );
};
