import nextResponse from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "my_super_secret_key";

export const POST = async (req: NextRequest) => {
  try {
    const { token } = await req.json(); // <-- access_token from frontend

    // Call Google API with access_token
    const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      return nextResponse({ message: "Invalid Google token" }, { status: 401 });
    }

    const { email, name, picture } = await res.json();

    if (!email) {
      return nextResponse(
        { message: "Google account missing email" },
        { status: 400 }
      );
    }

    // Check if user exists
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: { email, userName: name || null, img: picture || null },
      });
    }

    // Create JWT
    const jwtToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        userName: user.userName,
        img: user.img,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = nextResponse(
      { message: "User logged in successfully!", user },
      { status: 200 }
    );

    response.cookies.set("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Google auth error:", error);
    return nextResponse(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
};
