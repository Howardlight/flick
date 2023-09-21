import MovieSVG from "../../assets/MovieSVG.svg";
import { Metadata } from "next";
import SignInForm from "./SignInForm";
import Image from "next/image";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Sign in - Flick"
}

export default function SignIn() {

    //TODO: Flesh this out properly
    // Add a nice Background
    // Add a nice top Header
    // Mention this registration being by TMDB
    // Link TMDB and their registration
    //TODO: Handle Errors more swiftly
    //TODO: Fix Error that occurs with hydration, specifically with form appearing new div
    //TODO: Make form Responsive to bigger Screens, looks ok for small screens, needs alot of work

    return (
        <div className="h-screen w-auto p-10">
            <div className="flex flex-row items-center">
                <Suspense fallback={<p>Loading</p>}>
                    <Image
                        src={MovieSVG}
                        alt={"Flick logo"}
                        height={32}
                        width={32}
                        className=""
                    />
                    <p className="font-semibold text-2xl">Sign in to Flick</p>
                </Suspense>
            </div>
            <div className="mt-10">
                <SignInForm />
            </div>
        </div>
    )
}