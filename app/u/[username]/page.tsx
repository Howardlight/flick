import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export default async function Page() {
    const session = await getServerSession(authOptions);


    return (
        <div>
        </div>
    )
}