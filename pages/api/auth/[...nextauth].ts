import NextAuth from "next-auth"
import { CredentialsProvider } from "next-auth/providers"


export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "TMDB Credentials",
            credentials: {

            },
            async authorize(credentials: any, req: any) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const res = await fetch(`/api/requestSession/${request_token}`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()

                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })

        // ...add more providers here
    ],
}
export default NextAuth(authOptions)