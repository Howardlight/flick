import { NextResponse } from "next/server";
import { TVParams } from "../paramsType";

export async function GET(request: NextResponse, { params }: { params: TVParams }) {
    const TVID = params.TVID;
    let data;

    const req = await fetch(`https://api.themoviedb.org/3/tv/${TVID}/recommendations?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`);
    data = await req.json();

    if (req.status == 401) return NextResponse.json(data, { status: 401 });
    else if (req.status == 404) return NextResponse.json(data, { status: 404 });
    else if (req.status != 200) return NextResponse.json({ status_message: "internal server error, this should not appear." }, { status: 500 })
    else return NextResponse.json(data, { status: 200 });
}