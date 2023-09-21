"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Fragment } from "react";
import Spinner from "./SVGComponents/Spinner";
import Link from "next/link";

export default function NavbarProfile() {
    const { data: session, status } = useSession();

    return (
        <div className="flex flex-row gap-2 items-center">

            <UserElement status={status} />
            {session?.user && status === "authenticated" == true ?
                <Link href={"#"} className="hover:text-neutral-100 rounded-md" passHref>
                    <div className="flex scale-90 items-center hover:bg-neutral-900 justify-center w-8 h-auto rounded-md text-lg border-2 font-semibold border-red-600">
                        {session.user.name!.charAt(0)}
                    </div>
                </Link>
                : <Fragment />
            }

        </div>
    )
}

function UserElement({ status }: { status: "authenticated" | "loading" | "unauthenticated" }) {
    if (status === "loading") return (
        <button className="flex flex-row items-center gap-2 cursor-default rounded-md font-semibold">
            <div className="animate-spin">
                <Spinner className={"w-8 h-auto"} />
            </div>
            Loading...
        </button>);

    if (status === "authenticated") return (
        <button className="flex flex-row items-center gap-2 font-semibold hover:text-neutral-100" onClick={() => signOut()}>
            Log out
        </button>);

    return (
        <button onClick={() => signIn("credentials")} className="font-semibold hover:text-neutral-100">
            Log in
        </button>
    );
}