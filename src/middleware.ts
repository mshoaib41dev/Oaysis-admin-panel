import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function handleLoginRedirect(request: NextRequest) {
  const token = request.cookies.get("token");

  if (token?.value) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

function handleProtectedRedirect(request: NextRequest) {
  const token = request.cookies.get("token");

  if (!token?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export function middleware(request: NextRequest) {
  const url = new URL(request.url);

  // Allow static resources to be served
  if (
    url.pathname.startsWith("/_next/") ||
    url.pathname.startsWith("/static/")
  ) {
    return NextResponse.next();
  }

  // Redirect the root route `/` or undefined paths to `/login`
  if (url.pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (url.pathname === "/login") {
    return handleLoginRedirect(request);
  }

  if (url.pathname === "/dashboard") {
    return handleProtectedRedirect(request);
  }

  // Default behavior: Protect all other routes
  const token = request.cookies.get("token");
  if (!token?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/login", "/(.*)"],
};
