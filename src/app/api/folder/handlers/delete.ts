import nextResponse from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export async function DELETEHandler(req: NextRequest) {
  const { folderId } = await req.json();
  if (!folderId)
    return nextResponse({ message: "Folder id is required" }, { status: 400 });
  try {
    const deletedFolder = await prisma.folder.delete({
      where: { id: folderId },
    });
    return nextResponse(
      { message: "Folder deleted successfully !", deletedFolder },
      { status: 200 }
    );
  } catch (error) {
    return nextResponse(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
