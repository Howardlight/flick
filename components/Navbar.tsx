"use client";

import MovieSVG from "../assets/MovieSVG.svg";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, Fragment, SetStateAction, useContext, useState } from "react";
import { UserContext } from "./TopTreeComponents/UserContextProvider";
import { User } from "../types/User";
import { useRouter } from "next/navigation";
import { NextRouter } from "next/router";
import Spinner from "./SVGComponents/Spinner";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { accessToken, requestToken, V4ToV3Request } from "../types/Auth";

interface SnackbarProps {
    show: boolean;
    errorBrief: string | null;
    errorMessage: string | null;
}
export async function logout(router: AppRouterInstance) {
    await fetch("/api/auth/logout");

    //TODO: router.reload does not exist on AppRouterInstance

    // router.reload();
}

export interface LoginResponse {
    occuredAt: string,
    status: number
}

export async function handleLogin(router: AppRouterInstance): Promise<LoginResponse> {
    return new Promise(async (resolve, reject) => {

        // Request a request Token
        // This token has no real value,
        const reqTokenReq = await getRequestToken();
        if (reqTokenReq.status != 200) {

            return resolve({ occuredAt: "RequestToken", status: reqTokenReq.status });
        };

        // once the token has been created, the user will be prompted to verify it
        const requestTokenData = await reqTokenReq.json();
        if (reqTokenReq.status == 200) window.open(`https://www.themoviedb.org/auth/access?request_token=${requestTokenData.request_token}`, "_blank");

        // Give the User Time to approve the token, otherwise Logging in will fail
        setTimeout(async function () {

            // after the specified time, get the access token using the request token
            const accessTokenReq = await getAccessToken(requestTokenData);
            if (accessTokenReq.status != 200) {
                //TODO: Finish this

                return resolve({ occuredAt: "AccessToken", status: accessTokenReq.status });
            }

            // convert the v4 token to v3, so we can use it
            const accessTokenData = await accessTokenReq.json();
            const v3Req = await convertToV3(accessTokenData);
            if (v3Req.status != 200) {

                return resolve({ occuredAt: "V3ToV4", status: v3Req.status });
            }

            // once converted, pass the session_id to a cookie with
            // the login function
            const v3ReqData = await v3Req.json();
            const loginReq = await login(v3ReqData, router);

            return resolve({ occuredAt: "Login", status: loginReq.status });
        }, 15000);
    })
}

async function getRequestToken() {
    const req = await fetch("/api/auth/requestToken", {
        method: "POST",
        body: JSON.stringify({
            redirect_to: "",
        })
    });
    return req;
}

async function getAccessToken(requestTokenData: requestToken) {
    const accessTokenReq = await fetch(`/api/auth/accessToken`, {
        method: "POST",
        body: JSON.stringify({
            request_token: requestTokenData.request_token
        })
    })
    return accessTokenReq;
}

async function convertToV3(accessTokenData: accessToken) {
    const v3Req = await fetch("/api/auth/convertV4SessionToV3", {
        method: "POST",
        body: JSON.stringify({
            access_token: accessTokenData.access_token
        })
    })
    return v3Req;
}

async function login(v3ReqData: V4ToV3Request, router: AppRouterInstance) {
    const loginReq = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
            session_id: v3ReqData.session_id
        })
    })

    //TODO: router.reload does not exist on AppRouterInstance
    // if (loginReq.status == 200) router.reload();
    return loginReq;
}


const ErrorSnackbar = ({ props, setSnackbarProps }: { props: SnackbarProps, setSnackbarProps: Dispatch<SetStateAction<SnackbarProps>> }) => {

    //TODO: Improve styles
    //TODO: currently the text clips through the X, fix that
    //TODO: give more descriptive errors
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

    async function handleNavbarLogin(router: AppRouterInstance) {
        setLoading(true);
        const response = await handleLogin(router);


        // This handles when Login fails, in Successful cases, the page reloads and this is not experienced
        setLoading(false);
        const snackbarRes = handleLoginErrors(response);
        setSnackbarProps({ show: true, errorBrief: snackbarRes.errorBrief, errorMessage: snackbarRes.errorMessage });
    }


    //TODO: Add transitions to snackbar
    function handleLoginErrors(response: LoginResponse) {
        switch (response.occuredAt) {
            case "RequestToken":
                switch (response.status) {
                    case 401:
                        return { errorBrief: "RequestToken 401", errorMessage: "Token not granted write permission by the user" }
                    case 404:
                        return { errorBrief: "RequestToken 404", errorMessage: "Resource not found" }
                    case 500:
                        return { errorBrief: "RequestToken 500", errorMessage: "Internal error: Something went wrong with TMDB" }
                    default:
                        return { errorBrief: "RequestToken UNK", errorMessage: "Unknown Error" }
                }
            case "AccessToken":
                switch (response.status) {
                    case 401:
                        return { errorBrief: "AccessToken 401", errorMessage: "Token not granted write permission by the user" }
                    case 404:
                        return { errorBrief: "AccessToken 404", errorMessage: "Resource not found" }
                    case 500:
                        return { errorBrief: "AccessToken 500", errorMessage: "Internal error: Something went wrong with TMDB" }
                    default:
                        return { errorBrief: "AccessToken UNK", errorMessage: "Unknown Error" }
                }
            case "V3ToV4":
                switch (response.status) {
                    case 401:
                        return { errorBrief: "V3ToV4 401", errorMessage: "Invalid API Key, Contact the creator of Flick" }
                    case 404:
                        return { errorBrief: "V3ToV4 404", errorMessage: "Resource not found" }
                    default:
                        return { errorBrief: "V3ToV4 UNK", errorMessage: "Unknown Error" }
                }
            case "Login":
                switch (response.status) {
                    case 401:
                        return { errorBrief: "Login 401", errorMessage: "Invalid API Key, Contact the creator of Flick" }
                    case 404:
                        return { errorBrief: "Login 404", errorMessage: "Resource not found" }
                    default:
                        return { errorBrief: "Login UNK", errorMessage: "Unknown Error" }

                }
            default:
                return { errorBrief: "UNK UNK", errorMessage: "Unknown Error" }
        }
    }


    function UserElement({ user, router }: { user: User, router: AppRouterInstance }) {
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

                    <UserElement user={user} router={router} />
                    {user && user.isLoggedIn == true ?
                        <Link href={"#"} className="hover:text-neutral-100 rounded-md" passHref>
                            <div className="flex scale-90 items-center hover:bg-neutral-900 justify-center w-8 h-auto rounded-md text-lg border-2 font-semibold border-red-600">
                                {user.username?.charAt(0)}
                            </div>
                        </Link>
                        : <Fragment />
                    }

                </div>
            </nav>
            <ErrorSnackbar setSnackbarProps={setSnackbarProps} props={snackbarProps} />
        </Fragment>
    )
}