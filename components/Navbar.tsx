import MovieSVG from "../assets/MovieSVG.svg";
import Image from "next/image";
import Link from "next/link";
import { handleLogin, logout } from "../pages";
import { Fragment, useContext, useState } from "react";
import { UserContext } from "../pages/_app";
import { User } from "../types/User";
import { NextRouter, useRouter } from "next/router";
import Spinner from "./SVGComponents/Spinner";

export const Navbar = () => {

    const [loading, setLoading] = useState(false);

    const user = useContext(UserContext);
    const router = useRouter();
    // console.log(`Navbar user: `, user);

    async function handleNavbarLogin(router: NextRouter) {
        setLoading(true);
        handleLogin(router);
    }


    function UserElement({ user, router }: { user: User, router: NextRouter }) {
        if (!user) return (
            <button className="flex flex-row items-center gap-2 cursor-default rounded-md font-semibold">
                <div className="animate-spin">
                    <Spinner className={"w-8 h-auto"} />
                </div>
                Loading...
            </button>);

        if (user.isLoggedIn) return (
            <button className="flex flex-row items-center gap-2 font-semibold hover:text-neutral-100" onClick={() => logout(router)}>
                Log out
            </button>);

        else return (
            <button onClick={() => handleNavbarLogin(router)} className="font-semibold hover:text-neutral-100">
                {!loading ?
                    "Log in"
                    : <div className="flex flex-row items-center gap-2">
                        <Spinner className="animate-spin w-8 h-auto" />
                        Logging in...
                    </div>
                }
            </button>);
    }


    return (
        <nav className="flex flex-row pt-2 pb-2 pl-4 pr-4 text-neutral-300 bg-transparent">
            <Link href="/" passHref>
                <a className="">
                    <div className="flex flex-row justify-start">
                        <Image
                            src={MovieSVG}
                            alt={"Flick logo"}
                            height={30}
                            width={30}
                        />
                        <p className="font-medium text-lg hover:text-neutral-100">Flick</p>
                    </div>
                </a>
            </Link>
            <div className="grow"></div>
            <div className="flex flex-row gap-2 items-center">

                <UserElement user={user} router={router} />
                {user && user.isLoggedIn == true ?
                    <Link href={"#"} passHref>
                        <a className="hover:text-neutral-100 rounded-md">
                            <div className="flex scale-90 items-center hover:bg-neutral-900 justify-center w-8 h-auto rounded-md text-lg border-2 font-semibold border-red-600">
                                {user.username?.charAt(0)}
                            </div>
                        </a>
                    </Link>
                    : <Fragment />
                }

            </div>
        </nav>
    )
}