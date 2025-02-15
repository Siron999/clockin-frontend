import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/tasks")) {
    return handleTasksMiddleware(req);
  }

  if (pathname.startsWith("/signin")) {
    return handleSigninMiddleware(req);
  }

  return NextResponse.next();
}

async function handleTasksMiddleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    console.log("No token found, redirecting to signin page");
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

async function handleSigninMiddleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (token) {
    console.log("Token found, redirecting to tasks page");
    return NextResponse.redirect(new URL("/tasks", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tasks/:path*", "/signin"],
};
