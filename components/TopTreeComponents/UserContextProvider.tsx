"use client";

import { Router } from "next/router";
import { createContext, ReactElement, useEffect } from "react";
import { User } from "../../types/User";
import useUser from "../../useUser";
import NProgress from "nprogress";

const defaultUserContext: User = {
    isLoggedIn: false
}

export const UserContext = createContext<User>(defaultUserContext);
export default function ContextProvider({ children }: { children: React.ReactNode }) {

    // Get Session/Cookie if present
    const { user } = useUser({
        redirectTo: "",
    });
    // console.log("user: ", user);

    //TODO: Fix NProgress
    useTopLevelNProgressBar();

    return (
        <UserContext.Provider value={user!}>
            {children}
        </UserContext.Provider>
    )
}

export function useTopLevelNProgressBar() {

    function useNProgressBar(router: Router) {
        useEffect(() => {

            router.events.on("routeChangeStart", (url) => {
                NProgress.start()
            });

            router.events.on("routeChangeComplete", (url) => {
                NProgress.done()
            });

            // Router.events.on("routeChangeError", (url) => {
            //   NProgress.done()
            // });

        }, [router])
    }
    // ProgressBar when routing
    useNProgressBar(Router as unknown as Router);
}