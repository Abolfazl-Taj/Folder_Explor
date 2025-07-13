import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing Email Or Password" },
        { status: 400 }
      );
    }

    const existUser = await prisma.user.findUnique({ where: { email } });
    if (existUser) {
      return NextResponse.json(
        { error: "User already exists!" },
        { status: 409 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashPassword },
      select: { id: true, email: true, createdAt: true },
    });

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error", err },
      { status: 500 }
    );
  }
}
