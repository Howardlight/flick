import MovieSVG from "../../assets/MovieSVG.svg";
import { Metadata } from "next";
import SignInForm from "./SignInForm";
import Image from "next/image";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Sign in - Flick"
}

export default function SignIn() {

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