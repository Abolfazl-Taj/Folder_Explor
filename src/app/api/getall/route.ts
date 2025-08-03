import jwt from "jsonwebtoken";
import nextResponse, { nextRedirect } from "@/app/lib/nextResponse";
import { NextRequest } from "next/server";
import prisma from "@/app/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "my_super_secret_key";

export const GET = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value;
    console.log("token is here", token);

    if (!token) {
      return nextRedirect("/login", req);
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const userId = decoded.id;

    const [folders, files] = await prisma.$transaction([
      prisma.folder.findMany({
        where: { userId, parentId: null },
        select: {
          id: true,
          name: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.file.findMany({
        where: { userId, folderId: null },
        select: {
          id: true,
          name: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
    ]);

    return nextResponse(
      {
        message: "Fetched successfully!",
        data: { folders, files },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET Error:", error);

    return nextResponse(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};
