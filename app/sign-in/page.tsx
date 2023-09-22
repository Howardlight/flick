import MovieSVG from "../../assets/MovieSVG.svg";
import { Metadata } from "next";
import SignInForm from "./SignInForm";
import Image from "next/image";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Sign in - Flick"
}

export default function SignIn() {

    //TODO: Make the Sign in Form nicer
    //TODO: Add a nicer background
    //TODO: Flesh this out properly
    //TODO: Handle Errors more swiftly
    //TODO: Add a remember me Integration, where you destroy the session when the user closes the window/ tweak max age of session

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