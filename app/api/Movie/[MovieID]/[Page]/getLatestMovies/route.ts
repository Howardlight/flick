import { NextRequest, NextResponse } from "next/server";
import { MovieParams, MovieParamsPage } from "../../paramsType";

/** 
 *  **get Latest Movies**
 * 
 * Returns the latest Movies
 * @remarks
 * Language is hard code to Page 1
 */
export async function GET(request: NextRequest, { params }: { params: MovieParamsPage }) {
    let data;


    const req = await fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    data = await req.json();

    if (req.status == 401) return NextResponse.json(data, { status: 401 });
    else if (req.status == 404) return NextResponse.json(data, { status: 404 });
    else if (req.status != 200) return NextResponse.json({ status_message: "internal server error, this should not appear." }, { status: 500 })
    else return NextResponse.json(data, { status: 200 });
}