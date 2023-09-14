"use client";

import { createContext } from "react";
import { User } from "../../types/User";
import useUser from "../../useUser";

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

    return (
        <UserContext.Provider value={user!}>
            {children}
        </UserContext.Provider>
    )
}