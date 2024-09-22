"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Fragment } from "react";
import Spinner from "./SVGComponents/Spinner";
import Link from "next/link";

export default function NavbarProfile() {
    const { data: session, status } = useSession();

    return (
        <div className="flex flex-row items-center gap-2">

            <UserElement status={status} />
            {session?.user && status === "authenticated" == true ?
                <Link href={"#"} className="rounded-md hover:text-neutral-100" passHref>
                    <div className="flex items-center justify-center w-8 h-auto text-lg font-semibold scale-90 border-2 border-red-600 rounded-md hover:bg-neutral-900">
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
        <button className="flex flex-row items-center gap-2 font-semibold rounded-md cursor-default">
            <div className="animate-spin">
                <Spinner className={"w-8 h-auto"} />
            </div>
            Loading...
        </button>
    );

    if (status === "authenticated") return (
        <button className="flex flex-row items-center gap-2 font-semibold hover:text-neutral-100" onClick={() => signOut()}>
            Sign out
        </button>
    );

    return (
        <button onClick={() => signIn()} className="font-semibold hover:text-neutral-100">
            Sign in
        </button>
    );
}