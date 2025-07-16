import getUserId from "@/app/lib/getUserId";
import nextResponse, { nextRedirect } from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export const POSTHandler = async (req: NextRequest) => {
  try {
    const { name, folderId, url } = await req.json();
    const userId = getUserId(req);
    if (!name) {
      return nextResponse({ message: "Name is required!" }, { status: 400 });
    }
    if (!userId) {
      return nextRedirect("/login", req.url);
    }
    const file = await prisma.file.create({
      data: {
        name,
        userId,
        folderId: folderId || null,
        url: url || null,
      },
    });

    return nextResponse(
      { message: "File created successfully!", file },
      { status: 201 }
    );
  } catch (err) {
    console.error("File creation error:", err);
    return nextResponse(
      {
        message: "Internal Server Error",
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
};
