import jwt from "jsonwebtoken";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";
import nextResponse, { nextRedirect } from "@/app/lib/nextResponse";
const JWT_SECRET = process.env.JWT_SECRET || "my_super_secret_key";

export async function GETHandler(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return nextRedirect("/login", req.url);
    const decode = jwt.verify(token, JWT_SECRET) as { userId: string };
    const userId = decode.userId;
    const folders = await prisma.folder.findMany({
      where: { userId },
      include: {
        files: true,
        user: true,
      },
    });

    if (!folders || folders.length === 0) {
      return nextResponse({ message: "No folders found" }, { status: 404 });
    }

    return nextResponse(
      { message: "Folders fetched successfully!", folders },
      { status: 200 }
    );
  } catch (error) {
    console.error("GETHandler Error:", error);
    return nextResponse({ message: "Internal server error" }, { status: 500 });
  }
}
