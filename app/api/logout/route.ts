import { NextResponse } from "next/server";

export async function POST() {
  console.log("Logout API hit");
  
  try {
    const response = NextResponse.redirect("/login");

    response.cookies.delete("next-auth.session-token");
    response.cookies.delete("__Secure-next-auth.session-token");

    console.log("Cookies deleted");
    return response;
  } catch (error) {
    console.error("Error in logout API:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
