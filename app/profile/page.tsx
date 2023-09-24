import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Your Profile - Flick"
}

export default async function Profile() {
    const session = await getServerSession(authOptions);
    console.log("Frontend Session: ", session);
    if (!session) redirect("/sign-in");
    return (
        <div>


        </div>
    )
}