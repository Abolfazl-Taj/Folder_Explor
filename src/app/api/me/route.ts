import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "my_super_secret_key";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    return NextResponse.json(
      {
        message: "Authenticated",
        user: {
          id: decoded.id,
          email: decoded.email,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
