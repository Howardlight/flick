import { NextRequest, NextResponse } from "next/server";
import { SearchParams } from "../../paramsType";


/**
 *  **GetUpcoming**
 * 
 * Returns a list of Upcoming Movies
 *  
 * @params page - The selected page
 */
export async function GET(request: NextRequest, { params }: { params: SearchParams }) {
    const query = params.SearchQuery;
    let page = params.Page;
    if (!page) page = "1";

    let data;

    const req = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`);
    data = await req.json();



    if (req.status == 401) return NextResponse.json(data, { status: 401 });
    else if (req.status == 404) return NextResponse.json(data, { status: 404 });
    else if (req.status != 200) return NextResponse.json({ status_message: "internal server error, this should not appear." }, { status: 500 })
    else return NextResponse.json(data, { status: 200 });
}