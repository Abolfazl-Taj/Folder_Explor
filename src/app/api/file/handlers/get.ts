import jwt from "jsonwebtoken";
import nextResponse, { nextRedirect } from "@/app/lib/nextResponse";
import { NextRequest } from "next/server";
import prisma from "@/app/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "my_super_secret_key";

export const GETHanlder = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return nextRedirect("/login", req.url);
    const decode = jwt.verify(token, JWT_SECRET) as { id: string };
    const userId = decode.id;
    const files = await prisma.file.findMany({ where: { userId } });
    return nextResponse(
      { message: "Files fetched successfully !", files },
      { status: 200 }
    );
  } catch (err) {
    return nextResponse(
      { message: "Internal server error", err },
      { status: 500 }
    );
  }
};
