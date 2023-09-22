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
        <div className="h-screen w-auto bg-hero">
            <div className="flex w-full h-full md:items-center justify-center p-4">

                <div className="flex flex-col items-center max-w-lg w-full mt-10 md:gap-4 gap-6">
                    <div className="flex flex-row self-start items-center gap-2">
                        <Image
                            src={MovieSVG}
                            alt={"Flick logo"}
                            height={64}
                            width={64}
                        />
                        <p className="font-bold text-2xl">Sign in to Flick</p>
                    </div>
                    <div className="w-full bg-black rounded-md p-5">
                        <SignInForm />
                    </div>
                </div>

            </div>
        </div>
    )
}