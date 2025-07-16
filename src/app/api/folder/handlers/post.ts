import jwt from "jsonwebtoken";
import prisma from "@/app/lib/prisma";
import nextResponse, { nextRedirect } from "@/app/lib/nextResponse";
import { NextRequest } from "next/server";
const JWT_SECRET = process.env.JWT_SECRET || "my_super_secret_key";

export async function POSTHandler(req: NextRequest) {
  const token =
    req.cookies.get("token")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");
  const { name, parentId } = await req.json();
  if (!token) return nextRedirect("/login", req.url);
  const decode = jwt.verify(token, JWT_SECRET) as { id: string };
  const userId = decode.id;
  if (!name) {
    return nextResponse({ message: "Folder name required!" }, { status: 400 });
  }
  if (!userId) {
    return nextResponse({ message: "User id required!" }, { status: 400 });
  }
  try {
    const folder = await prisma.folder.create({
      data: { name, userId, parentId },
    });
    return nextResponse(
      { message: "Folder created successfully ", folder },
      { status: 200 }
    );
  } catch (error) {
    return nextResponse({ message: "Internal server error" }, { status: 500 });
  }
}
