import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "my_super_secret_key";

// Public routes that don’t require auth
const publicRoutes = [
  "/api/login",
  "/api/register",
  "/api/folder",
  "/api/me",
  "/api/logout",
  "/login",
  "/register",
  "/api/file",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/fonts") ||
    pathname.endsWith(".json")
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;
  const isPublic = publicRoutes.some((path) => pathname.startsWith(path));

  if (isPublic) return NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    jwt.verify(token, JWT_SECRET);

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
