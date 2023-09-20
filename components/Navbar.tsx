import MovieSVG from "../assets/MovieSVG.svg";
import Image from "next/image";
import Link from "next/link";
import NavbarProfile from "./NavbarProfile";

export default function Navbar() {
    return (
        <nav className="flex flex-row pt-2 pb-2 pl-4 pr-4 text-neutral-300 bg-transparent">
            <Link href="/" passHref>
                <div className="flex flex-row justify-start">
                    <Image
                        src={MovieSVG}
                        alt={"Flick logo"}
                        height={30}
                        width={30}
                    />
                    <p className="font-medium text-lg hover:text-neutral-100">Flick</p>
                </div>
            </Link>
            <div className="grow"></div>
            <div className="flex flex-row gap-2 items-center">
                <NavbarProfile />
            </div>
        </nav>
    )
}