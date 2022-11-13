import { Fragment } from "react";
import { Navbar } from "../components/Navbar";


export default function Custom404() {
    return (
        <div className="w-[100vw] h-[100vh] flex flex-col">
            <Navbar />
            <main className="flex flex-col justify-center items-center grow">
                <p className="text-3xl text-neutral-200">404</p>
                <p className="text-lg text-neutral-500">It seems what you&apos;re looking for is not found</p>
            </main>
        </div>

    );
};
