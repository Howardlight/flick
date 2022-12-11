import { IronSessionData } from "iron-session";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { ironOptions } from "./login";

//@ts-ignore
export default withIronSessionApiRoute(logoutRoute, ironOptions)


function logoutRoute(req: NextApiRequest, res: NextApiResponse, session: IronSessionData) {
    req.session.destroy();
    res.send({ ok: true });
}