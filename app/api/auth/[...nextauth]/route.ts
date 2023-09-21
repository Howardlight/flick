import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

interface RequestToken {
    success: boolean,
    expires_at: Date,
    request_token: string
}

interface SessionRequest {
    success: boolean,
    session_id: string
}

//TODO: Create a custom Page
export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'TMDB',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (typeof credentials !== "undefined") {

                    // const res = await authenticate(credentials.username, credentials.password, )
                    const requestTokenData = await createRequestToken();
                    if (requestTokenData === null) return null;

                    const validRequestToken = await validateWithLogin(credentials.username, credentials.password, requestTokenData.request_token);
                    if (!validRequestToken) return null;

                    const session = await createSession(validRequestToken.request_token);

                    if (session !== null) return { name: credentials!.username, id: session.session_id };

                    else return null
                } else return null
            }
        })
    ],
    session: { strategy: "jwt" },
    pages: {
        signIn: "/sign-in"
    }
}


async function createRequestToken() {
    const url = 'https://api.themoviedb.org/3/authentication/token/new';
    const options = {
        method: 'GET', headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        }
    };

    const req = await fetch(url, options);
    if (req.status !== 200) return null;

    const data: RequestToken = await req.json();
    if (!data.success) return null;

    return data;
}

async function validateWithLogin(username: string, password: string, request_token: string): Promise<RequestToken | null> {
    const url = 'https://api.themoviedb.org/3/authentication/token/validate_with_login';
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        },
        body: JSON.stringify({
            username: username,
            password: password,
            request_token: request_token
        })
    };

    const res = await fetch(url, options);
    if (res.status !== 200) return null;

    const data: RequestToken = await res.json();
    if (!data.success) return null;

    return data;
}

async function createSession(request_token: string) {
    const url = 'https://api.themoviedb.org/3/authentication/session/new';
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        },
        body: JSON.stringify({ request_token: request_token })
    };

    const res = await fetch(url, options);
    if (res.status !== 200) return null;

    const data: SessionRequest = await res.json();
    if (!data.success) return null;

    return data;
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }