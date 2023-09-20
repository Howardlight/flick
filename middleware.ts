import { withAuth } from "next-auth/middleware"

// middleware is applied to all routes, use conditionals to select
//Further documentation: https://medium.com/ascentic-technology/authentication-with-next-js-13-and-next-auth-9c69d55d6bfd

// The authorized callback is invoked to check if the user is authorized (duh!). This means that we can add our own rules 
// based on the information in req and token . In this use case, users can only access routes that start with /protected 
// only if they have been authenticated (to be precise, if a token is available). If we return false the middleware will 
// redirect to the sign in page (specifically the <your Next.js server>/api/auth/signin route from earlier unless you have 
// defined a custom route). Later on, we will see how we can attach the user object from the external API onto the token so 
// that we can do role-based access control as well!
export default withAuth(
    function middleware(req) {

    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                if (
                    req.nextUrl.pathname.startsWith('/protected') &&
                    token === null
                ) {
                    return false
                }
                return true
            }
        }
    }
)