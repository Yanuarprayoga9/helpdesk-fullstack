import { auth } from "@/auth"

import {
  authRoutes,
  apiAuthPrefix,
  publicRoutes,
  DEFAULT_ISLOGIN_REDIRECT,
} from "@/routes/index";

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    console.log("middleware")
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            console.log("middleware isLoggedIn")

            return Response.redirect(new URL(DEFAULT_ISLOGIN_REDIRECT, nextUrl));
        }
    }


    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
        console.log("middleware !isLoggedIn && !isPublicRoute")

        return Response.redirect(new URL(
            `/login?callbackUrl=${encodedCallbackUrl}`,
            nextUrl
        ));
    }

});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};