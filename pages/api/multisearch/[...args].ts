import { NextApiRequest, NextApiResponse } from "next";

/**
 *  **Multi Search**
 * 
 *  Returns a List of Items - Movies - TV Shows - People that match the searched Query
 * 
 * @remarks 
 * Language is hardcoded en-US
 * 
 * @params page The selected page.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const slugs = req.query;
    const query = slugs.args![0];
    let page = slugs.args![1];
    if (!page) page = "1";

    let data;

    const request = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`);
    data = await request.json();

    if (request.status == 401) res.status(401).json(data);
    else if (request.status == 404) res.status(404).json(data);
    else if (request.status != 200) res.status(500).json({ status_message: "internal server error, this should not appear." })
    else res.status(200).json(data);
}