import getUserId from "@/app/lib/getUserId";
import nextResponse from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export async function DELETEHandler(req: NextRequest, id: string) {
  const userId = getUserId(req);
  
  if (!id) {
    return nextResponse({ message: "Folder ID is required" }, { status: 400 });
  }
  try {
    const folder = await prisma.folder.findUnique({
      where: { id },
      select: { userId: true, permissions: true },
    });
    if (!folder)
      return nextResponse({ message: "Folder not found" }, { status: 404 });
    const isAuthorized =
      folder.userId === userId ||
      folder.permissions.find((u) => u.id === userId)?.canDelete;
    if (isAuthorized) {
      const deletedFolder = await prisma.folder.delete({
        where: { id: id },
      });
      return nextResponse(
        { message: "Folder deleted successfully!", deletedFolder },
        { status: 200 }
      );
    } else {
      return nextResponse({ message: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    console.log(error);
    return nextResponse(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
