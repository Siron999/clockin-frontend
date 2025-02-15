import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

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
  const session = await auth();

  if (!session) {
    console.log("No session found, redirecting to signin page");
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

async function handleSigninMiddleware(req: NextRequest) {
  const session = await auth();

  if (session) {
    console.log("Session found, redirecting to tasks page");
    return NextResponse.redirect(new URL("/tasks", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tasks/:path*", "/signin"],
};
