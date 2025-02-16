import { auth } from "@/auth";

import {
    authRoutes,
    publicRoutes,
    DEFAULT_ISLOGIN_REDIRECT,
    protectedRoutes,
} from "@/routes";
import { NextResponse } from "next/server";

// Middleware for handling authentication in Next.js
export default auth((req) => {
    console.log("middleware");
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth; // Check if the user is logged in

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isAProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

    // If the user is already logged in and tries to access an authentication page
    if (isAuthRoute) {
        if (isLoggedIn) {
            // Redirect to the default page after login (e.g., dashboard)
            return Response.redirect(new URL(DEFAULT_ISLOGIN_REDIRECT, nextUrl));
        }
    }

    // If the user is not logged in and tries to access a non-public route
    if (!isLoggedIn && !isPublicRoute && isAProtectedRoute) {
        let callbackUrl = nextUrl.pathname;

        // Preserve query parameters if present (so the user can return to the requested page after login)
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
        console.log("middleware !isLoggedIn && !isPublicRoute");

        // Redirect to the login page with a callback URL to return to the original page after login
        return Response.redirect(
            new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
        );
    }


});

// Middleware configuration to apply only to specific routes
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
