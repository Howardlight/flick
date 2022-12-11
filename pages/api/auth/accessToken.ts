import { NextApiRequest, NextApiResponse } from "next";

interface accessTokenBody {
    request_token: string
}


/** 
 *  **Request Token**
 * 
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let data;
    const body: accessTokenBody = JSON.parse(req.body);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json;chartset=utf-8");
    myHeaders.append("Authorization", `Bearer ${process.env.TMDB_ACCESS_TOKEN}`);

    var raw = `{\r\n    \"request_token\": \"${body.request_token}\"\r\n}`;

    var requestOptions: Object = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const request = await fetch(`https://api.themoviedb.org/4/auth/access_token?api_key=${process.env.TMDB_API_KEY}`, requestOptions)
    data = await request.json();
    // console.log(data);


    if (request.status == 401) res.status(401).json(data);
    else if (request.status == 404) res.status(404).json(data);
    else if (request.status != 200) res.status(500).json({ status_message: "internal server error, this should not appear." })
    else {
        // console.log(data);
        res.status(200).json(data)
    };
}