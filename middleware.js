import { NextResponse } from "next/server";
import { authRoutes, protectedRoutes, userProtectedRoutes } from "./app/router/routes";

export function middleware(request) {
  const currentUser = request.cookies.get("currentUser")?.value;

  // Parse the currentUser cookie if it exists
  let user = null;
  if (currentUser) {
    try {
      user = JSON.parse(currentUser);
    } catch (e) {
      console.error("Failed to parse currentUser cookie:", e);
    }
  }

  const isAdmin = user?.jobRoleId === "admin";
  const isUser = user?.jobRoleId === "user";
  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);
  const isUserProtectedRoute = userProtectedRoutes.includes(request.nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);

  // Check for protected routes and userProtectedRoutes
  if ((isProtectedRoute || isUserProtectedRoute) && (!currentUser || Date.now() > user.expiredAt)) {
    request.cookies.delete("currentUser");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("currentUser");

    return response;
  }

  if (isProtectedRoute && isUser) {
    return NextResponse.redirect(new URL("/userDash", request.url));
  }

  if (isAuthRoute && currentUser) {
    if (isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/userDash", request.url));
    }
  }

  if (isProtectedRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/userDash", request.url));
  }
}
