import { IronSessionOptions } from "iron-session";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
// import { User } from "../user";

interface loginRouteBody {
    session_id: string
}


export const ironOptions: IronSessionOptions = {
    cookieName: "flick_auth_cookie",
    password: "complex_password_at_least_32_characters_long",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
    interface IronSessionData {
        session_id: string
    }
}


export default withIronSessionApiRoute(loginRoute, ironOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {


    // console.log("req.body: ", req.body);
    const loginRouteBody: loginRouteBody = JSON.parse(req.body);
    // console.log("loginRouteBody: ", loginRouteBody);


    req.session.session_id = loginRouteBody.session_id;

    await req.session.save()
    res.send({ ok: true });
};