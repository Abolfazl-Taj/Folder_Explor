import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logged out successfully!" },
    { status: 200 }
  );

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    path: "/dashboard",
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}
