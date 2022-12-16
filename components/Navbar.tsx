import MovieSVG from "../assets/MovieSVG.svg";
import Image from "next/image";
import Link from "next/link";
import { handleLogin, logout } from "../pages";
import { Dispatch, Fragment, SetStateAction, useContext, useState } from "react";
import { UserContext } from "../pages/_app";
import { User } from "../types/User";
import { NextRouter, useRouter } from "next/router";
import Spinner from "./SVGComponents/Spinner";

interface SnackbarProps {
    show: boolean;
    errorBrief: string | null;
    errorMessage: string | null;
}


const ErrorSnackbar = ({ props, setSnackbarProps }: { props: SnackbarProps, setSnackbarProps: Dispatch<SetStateAction<SnackbarProps>> }) => {

    //TODO: Improve styles
    //TODO: currently the text clips through the X, fix that
    if (!props.show) return <Fragment />;
    return (
        <div className="flex flex-row justify-between border-l-0 border-r-0 bg-black border-2 border-red-600 text-neutral-100 px-4 py-3 relative" role="alert">
            <div className="flex flex-row gap-2">
                <strong className="font-bold">{props.errorBrief != null ? props.errorBrief : "Placeholder Error"}</strong>
                <p className="sm:inline">{props.errorMessage != null ? props.errorMessage : "Placeholder description"}</p>
            </div>
            <span onClick={() => setSnackbarProps({ show: false, errorBrief: null, errorMessage: null })} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg className="fill-current block h-6 w-6 text-neutral-100" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span>
        </div>

    )
}


export const Navbar = () => {

    const [loading, setLoading] = useState(false);
    const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>({
        show: false,
        errorBrief: null,
        errorMessage: null
    });

    const user = useContext(UserContext);
    const router = useRouter();
    // console.log(`Navbar user: `, user);

    async function handleNavbarLogin(router: NextRouter) {
        setLoading(true);
        const response = await handleLogin(router);


        console.log("Response: ", response);
        // This handles when Login fails, in Successful cases, the page reloads and this is not experienced
        setLoading(false);

        setSnackbarProps({ show: true, errorBrief: "Could not login", errorMessage: "An unspecified error occured" })
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
        <Fragment>
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
            <ErrorSnackbar setSnackbarProps={setSnackbarProps} props={snackbarProps} />
        </Fragment>
    )
}