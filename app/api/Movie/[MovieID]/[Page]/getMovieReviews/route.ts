import { NextRequest, NextResponse } from "next/server";
import { MovieParamsPage } from "../../paramsType";


/** 
 * **Get Movie Reviews**
 * 
 * Returns Reviews for the selected Movie
 * 
 * @params movieID - ID of the selected Movie
 * @params page - the selected Page
*/
export async function GET(request: NextRequest, { params }: { params: MovieParamsPage }) {
    const movieID = params.MovieID;
    const page = params.Page;
    let data;

    const req = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/reviews?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`);
    data = await req.json();


    if (req.status == 401) return NextResponse.json(data, { status: 401 });
    else if (req.status == 404) return NextResponse.json(data, { status: 404 });
    else if (req.status != 200) return NextResponse.json({ status_message: "internal server error, this should not appear." }, { status: 500 })
    else return NextResponse.json(data, { status: 200 });
}