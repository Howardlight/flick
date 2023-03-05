import { NextResponse } from "next/server";
import { MovieParams } from "../paramsType";

/** 
 * **GetRecommendations**
 * 
 * Returns a List of Movies similar to current Movie.
 *
 * @remarks
 * Page is hardcoded to the 1st Page.
 * 
 * @params movieID - ID of the selected Movie. 
 */
export async function GET(request: NextResponse, { params }: { params: MovieParams }) {
    const movieID = params.MovieID;
    let data;
    // console.log(`movieID: `, movieID);

    const req = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`);
    data = await req.json();

    if (req.status == 401) return NextResponse.json(data, { status: 401 });
    else if (req.status == 404) return NextResponse.json(data, { status: 404 });
    else if (req.status != 200) return NextResponse.json({ status_message: "internal server error, this should not appear." }, { status: 500 })
    else return NextResponse.json(data, { status: 200 });
}