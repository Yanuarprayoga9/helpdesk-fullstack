import { NextResponse } from "next/server";
import { authRoutes, DEFAULT_ISLOGIN_REDIRECT } from "./constants/routes";
import { auth } from "./lib/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  const response = NextResponse.next();

  // ✅ Simpan current path ke cookie
  response.cookies.set("next-url", nextUrl.pathname);

  // 🔁 Redirect ke dashboard kalau user sudah login & akses login/register
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_ISLOGIN_REDIRECT, nextUrl));
  }

  return response;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
