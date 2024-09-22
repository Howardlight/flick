import { getServerSession } from "next-auth"
import Navbar from "../../../components/Navbar"
import { authOptions, getAccountDetails } from "../../api/auth/[...nextauth]/route";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { logError } from "../../../utils";

interface Props {
    params: { username: string },
    searchParams: { [key: string]: string | string[] | undefined }
}


export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {

    const username = params.username;
    const session = await getServerSession(authOptions);

    if (session?.user?.username === username) return {
        title: `Your Profile - Flick`
    };

    return {
        title: `${username}'s Profile - Flick`
    }
}


// export async function getUserDetails(username: string) {
//     try {

//         const url = `https://api.themoviedb.org/3/account/${username}`;
//         const options = {
//             method: 'GET',
//             headers: {
//                 accept: 'application/json',
//                 Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
//             }
//         };


//         const res = await fetch(url, options);
//         if (res.status !== 200) throw new Error(`Response Status is not 200! ${res.status} - ${res.statusText}`);

//         const data = await res.json();
//         return data;

//     } catch (error: any) {
//         logError(error, "getUserDetails");
//         return null;
//     }
// }


export async function getRatings(username: string) {
    try {

        const userDetails = await getAccountDetails(username);
        if (!userDetails) throw new Error("Could not fetch user Details");
        // console.log(userDetails);

        // const ratedMovies = await getRatedMovies(userDetails.id.toString());
        // console.log(ratedMovies);


        const ratedTV = await getRatedTV(userDetails.id.toString());
        console.log(ratedTV);


    } catch (error: any) {
        logError(error, "getRatings");
        return null;
    }
}

async function getRatedMovies(id: string) {
    try {

        const url = `https://api.themoviedb.org/3/account/${id}/rated/movies`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        };

        const res = await fetch(url, options);
        if (res.status !== 200) throw new Error(`Response status not 200! ${res.status} - ${res.statusText}`);[]

        const data = await res.json();
        return data;

    } catch (error: any) {
        logError(error, "getRatings");
        return null;
    }
}

async function getRatedTV(id: string) {
    try {

        const url = `https://api.themoviedb.org/3/account/${id}/rated/tv?language=en-US&page=1&sort_by=created_at.asc`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        };

        const res = await fetch(url, options);
        if (res.status !== 200) throw new Error(`Response status not 200! ${res.status} - ${res.statusText}`);[]

        const data = await res.json();
        return data;

    } catch (error: any) {
        logError(error, "getRatings");
        return null;
    }
}



export default async function UserLayout({ params, children }: { params: { username: string }, children: React.ReactNode }) {
    // const data = await getUserDetails(params.username);
    const ratings = await getRatings(params.username);


    // if (!data) return <p>User not found</p>;
    return (
        <section>
            <Navbar />
            <aside>

            </aside>
            {children}
        </section>
    )
}