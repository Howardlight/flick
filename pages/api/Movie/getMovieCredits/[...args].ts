

import { NextApiRequest, NextApiResponse } from "next";

/**
 * **get Movie Credits**
 * 
 *  Returns Crew and Cast which worked on the Movie
 * 
 * @params credit_id - Must be the Movie ID
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Returns a List, first element is the parent folder NAME, in this case: getpopular
    const slugs = req.query;
    const credit_id = slugs.args![0];
    let data;

    const request = await fetch(`https://api.themoviedb.org/3/movie/${credit_id}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    data = await request.json();


    if(request.status == 401) res.status(401).json(data);
    else if(request.status == 404) res.status(404).json(data);
    else if(request.status != 200) res.status(500).json({status_message: "internal server error, this should not appear."})
    else res.status(200).json(data);
}