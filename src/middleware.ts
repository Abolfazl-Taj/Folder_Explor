import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "my_super_secret_key"
);
// Public routes that don’t require auth
const publicRoutes = [
  "/api/login",
  "/api/register",
  "/api/folder",
  "/api/me",
  "/api/logout",
  "/login",
  "/api/file",
  "/api/getall",
  "/register",
  "/api/googleAuth",
];

export async function middleware(req: NextRequest) {
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
   await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (err) {
    console.log("catched a error in middleware", err);

    return NextResponse.redirect(new URL("/login", req.url));
  }
}
