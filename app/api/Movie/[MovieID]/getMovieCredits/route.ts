import { NextRequest, NextResponse } from "next/server";
import { MovieParams } from "../paramsType";

/**
 * **get Movie Credits**
 * 
 *  Returns Crew and Cast which worked on the Movie
 * 
 * @params credit_id - Must be the Movie ID
 */
export async function GET(request: NextRequest, { params }: { params: MovieParams }) {
    const creditID = params.MovieID;
    let data;

    const req = await fetch(`https://api.themoviedb.org/3/movie/${creditID}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
    data = await req.json();

    if (req.status == 401) return NextResponse.json(data, { status: 401 });
    else if (req.status == 404) return NextResponse.json(data, { status: 404 });
    else if (req.status != 200) return NextResponse.json({ status_message: "internal server error, this should not appear." }, { status: 500 })
    else return NextResponse.json(data, { status: 200 });
}