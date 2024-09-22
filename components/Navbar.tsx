'use client';
import MovieSVG from "../assets/MovieSVG.svg";
import Image from "next/image";
import Link from "next/link";
import NavbarProfile from "./NavbarProfile";
import { cn } from "./Movie-TV/Images/cn";

export default function Navbar({ classNameOverride }: { classNameOverride?: string }) {
    return (
        <nav className={cn(classNameOverride ?? "", "flex flex-row pt-2 pb-2 pl-4 pr-4 text-neutral-300 bg-transparent")}>
            <Link href="/" passHref>
                <div className="flex flex-row justify-start">
                    <Image
                        src={MovieSVG}
                        alt={"Flick logo"}
                        height={30}
                        width={30}
                    />
                    <p className="text-lg font-medium hover:text-neutral-100">Flick</p>
                </div>
            </Link>
            <div className="grow"></div>
            <div className="flex flex-row items-center gap-2">
                <NavbarProfile />
            </div>
        </nav>
    )
}