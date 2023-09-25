import NextAuth from "next-auth/next";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    /**
      * Returned by `useSession`, `getSession` and received as
      * a prop on the `SessionProvider` React Context
      */
    interface Session {
        expires?: Date,
        user?: User
    }

    /*
    * The shape of the user object returned in the OAuth providers' `profile` callback,
    * or the second parameter of the `session` callback, when using a database.
    */
    export interface User extends TMDBUser { };
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        user?: TMDBUser
    }
}


export interface TMDBUser {
    avatar: {
        gravatar: {
            hash: string
        },
        tmdb: {
            avatar_path: string
        }
    },
    id: string,
    iso_639_1: string,
    iso_3166_1: string,
    name: string,
    include_adult: boolean,
    username: string,
    session_id: string
}