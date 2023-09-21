import { NextApiRequest, NextApiResponse } from "next";

/** 
 *  **Request Token**
 * 
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(403).json({ message: "Access Denied" });
    return;

    let data;
    const body = JSON.parse(req.body);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "access_token": body.access_token
    });

    var requestOptions: Object = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const request = await fetch(`https://api.themoviedb.org/3/authentication/session/convert/4?api_key=${process.env.TMDB_API_KEY}`, requestOptions)
    data = await request.json();
    // console.log(data);


    if (request.status == 401) res.status(401).json(data)
    else if (request.status == 404) res.status(404).json(data);
    else if (request.status != 200) res.status(500).json({ status_message: "internal server error, this should not appear." })
    else {
        // console.log(data);
        res.status(200).json(data)
    };
}