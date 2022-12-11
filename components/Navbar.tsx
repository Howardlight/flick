import MovieSVG from "../assets/MovieSVG.svg";
import Image from "next/image";
import Link from "next/link";
import { handleLogin, logout } from "../pages";
import { useContext } from "react";
import { UserContext } from "../pages/_app";
import { User } from "../types/User";
import { NextRouter, useRouter } from "next/router";

export const Navbar = () => {


    const user = useContext(UserContext);
    const router = useRouter();
    // console.log(`Navbar user: `, user);

    function UserElement({ user, router }: { user: User, router: NextRouter }) {
        if (!user) return <p>Loading...</p>;
        if (user.isLoggedIn) return <button className="font-semibold hover:text-neutral-100" onClick={() => logout(router)}>Log out</button>
        else return <button onClick={() => handleLogin(router)} className="font-semibold hover:text-neutral-100">Log in</button>
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
            <div className="flex flex-row gap-3 justify-around items-center">


                <UserElement user={user} router={router} />


            </div>
        </nav>
    )
}