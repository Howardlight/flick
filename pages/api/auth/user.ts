import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from "./login";
import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../../types/User';

export interface Avatar {
    gravatar: Gravatar
}

interface Gravatar {
    hash: string
}

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {

    // console.log("session_id: ", req.session.session_id);

    if (req.session.session_id) {
        // in a real world application you might read the user id from the session and then do a database request
        // to get more information on the user if needed

        const request = await fetch(`https://api.themoviedb.org/3/account?api_key=${process.env.TMDB_API_KEY}&session_id=${req.session.session_id}`)
        const data = await request.json();
        // console.log(data);


        res.json({
            ...data,
            isLoggedIn: true,
        })
    } else {
        res.json({
            isLoggedIn: false,
        })
    }
}

export default withIronSessionApiRoute(userRoute, ironOptions);