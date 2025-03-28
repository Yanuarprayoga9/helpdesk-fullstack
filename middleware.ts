

import { authRoutes, DEFAULT_ISLOGIN_REDIRECT } from "./constants/routes";
import { auth } from "./lib/auth";

export default auth((req) => {
    console.log("middleware");
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;


    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_ISLOGIN_REDIRECT, nextUrl));
        }
    }



});

// Middleware configuration to apply only to specific routes
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
