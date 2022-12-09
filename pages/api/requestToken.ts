import { NextApiRequest, NextApiResponse } from "next";

interface requestTokenBody {
    redirect_to: string
}


/** 
 *  **Request Token**
 * 
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let data;
    const body: requestTokenBody = JSON.parse(req.body);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json;charset=utf-8");
    myHeaders.append("Authorization", `Bearer ${process.env.TMDB_ACCESS_TOKEN}`);

    const raw = {
        "redirect_to": body.redirect_to
    }

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    //@ts-ignore
    const request = await fetch("https://api.themoviedb.org/4/auth/request_token?api_key=be2b13195090224a6edfaa7360f1cf54", requestOptions)
    data = await request.json();
    // console.log(request.status);
    // console.log(data);

    if (request.status == 401) res.status(401).json(data)
    else if (request.status == 404) res.status(404).json(data);
    else if (request.status != 200) res.status(500).json({ status_message: "internal server error, this should not appear." })
    else {
        res.status(200).json(data)
    };
}