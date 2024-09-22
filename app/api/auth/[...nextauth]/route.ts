import NextAuth, { AuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { logError } from "../../../../utils/utils";
import { JWT } from "next-auth/jwt";

interface RequestToken {
  success: boolean;
  expires_at: Date;
  request_token: string;
}

interface SessionRequest {
  success: boolean;
  session_id: string;
}

interface UserDetailsResponse {
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: string;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

//TODO: Create a custom Page
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "TMDB",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<User | null> {
        if (
          typeof credentials !== "undefined" &&
          credentials.password &&
          credentials.username
        ) {
          let user: UserDetailsResponse | null = null;

          const requestTokenData = await createRequestToken();
          if (!requestTokenData) return null;

          const validRequestToken = await validateWithLogin(
            credentials.username,
            credentials.password,
            requestTokenData.request_token
          );
          if (!validRequestToken) return null;

          const session = await createSession(validRequestToken.request_token);
          // console.log("session: ", session);
          if (!session) return null;

          user = await getAccountDetails(
            session.session_id,
            credentials.username
          );
          // console.log("user: ", user);
          // NOTE: CONTENTS OTHER THAN PREDEFINED PROPERTIES WILL NOT BE USABLE
          // UNLESS AVAILABLE THROUGH JWT AND SESSION CALLBACKS
          if (user)
            return {
              ...user,
              id: user.id.toString(),
              session_id: session.session_id,
            } as User;
          else return null;
        }
        return null;
      },
    }),
  ],
  events: {
    signOut(message) {
      console.log(message);
      //TODO: Delete Session on sign out
      // await deleteSession(message.session.session_id)
    },
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      // console.log("[JWT] token: ", token);
      // console.log("[JWT] user: ", user);
      return { ...token, ...user } as unknown as JWT;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      let newSession: Session = { user: undefined, expires: session.expires };
      // console.log("[Session] token: ", token);
      // console.log("[Session] session: ", session);

      // session contains expires + base user properties {name, email, image}
      if (token) newSession.user = { ...token } as unknown as User;
      else newSession.user = session.user;

      return newSession;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },

  //More on pages: https://next-auth.js.org/configuration/pages
  pages: {
    signIn: "/sign-in",
  },
};

async function createRequestToken() {
  try {
    const url = "https://api.themoviedb.org/3/authentication/token/new";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    };

    const req = await fetch(url, options);
    if (req.status !== 200)
      throw new Error(
        `Response status is not 200 | status: ${req.status} - ${req.statusText} `
      );

    const data: RequestToken = await req.json();
    if (!data.success) throw new Error("Data is not successful");

    return data;
  } catch (error: any) {
    logError(error, "createRequestToken");
    return null;
  }
}

async function validateWithLogin(
  username: string,
  password: string,
  request_token: string
): Promise<RequestToken | null> {
  try {
    const url =
      "https://api.themoviedb.org/3/authentication/token/validate_with_login";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        username: username,
        password: password,
        request_token: request_token,
      }),
    };

    const res = await fetch(url, options);
    if (res.status !== 200)
      throw new Error(
        `Response Status is not 200 | ${res.status} - ${res.statusText}`
      );

    const data: RequestToken = await res.json();
    if (!data.success) throw new Error("Data is not successful");

    return data;
  } catch (error: any) {
    logError(error, "validateWithLogin");
    return null;
  }
}

async function createSession(request_token: string) {
  try {
    const url = "https://api.themoviedb.org/3/authentication/session/new";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ request_token: request_token }),
    };

    const res = await fetch(url, options);
    if (res.status !== 200)
      throw new Error(
        `Response status is not 200 | ${res.status} - ${res.statusText}`
      );

    const data: SessionRequest = await res.json();
    if (!data.success) throw new Error("Data is not successful");

    return data;
  } catch (error: any) {
    logError(error, "createSession");
    return null;
  }
}

async function deleteSession(session_id: string) {
  try {
    const url = "https://api.themoviedb.org/3/authentication/session";
    const options = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ session_id: session_id }),
    };

    const res = await fetch(url, options);
    if (res.status != 200)
      throw new Error(
        `Response status is not 200 | ${res.status} - ${res.statusText}`
      );

    const data = await res.json();
    if (!data.success)
      throw new Error("Delete session attempt was not successful");
    else console.log("Session Deleted Successfully");
    return;
  } catch (error: any) {
    logError(error, "deleteSession");
  }
}

async function getAccountDetails(session_id: string, username: string) {
  try {
    const url = `https://api.themoviedb.org/3/account/${username}?session_id=${session_id}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    };

    const res = await fetch(url, options);
    if (res.status != 200)
      throw new Error(
        `Response status is not 200 | ${res.status} - ${res.statusText}`
      );

    const data: UserDetailsResponse = await res.json();
    return data;
  } catch (error: any) {
    logError(error, "getAccountDetails");
    return null;
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
