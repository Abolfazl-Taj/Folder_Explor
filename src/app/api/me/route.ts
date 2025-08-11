import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "my_super_secret_key";
export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Check token existence and basic format
  if (!token || !token.startsWith("eyJ")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      img?: string; // Optional fields
      userName?: string;
      createdAt?: string;
      updatedAt?: string;
    };
    return NextResponse.json(
      {
        message: "Authenticated",
        user: {
          id: decoded.id,
          email: decoded.email,
          img: decoded.img || null,
          userName: decoded.userName || null,
          createdAt: decoded.createdAt || null,
          updatedAt: decoded.updatedAt || null,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
