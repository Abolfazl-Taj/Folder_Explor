import createLog from "@/app/lib/createLog";
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
    const deletedFile = await prisma.file.delete({
      where: { id: id },
    });
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { userName: true, email: true },
    });
    const parentFolder = deletedFile.folderId ?
      deletedFile.folderId &&
      (await prisma.folder.findUnique({
        where: { id: deletedFile.folderId },
        select: { name: true },
      })) : null
    await createLog({
      actor: userId,
      action: "FILE_DELETE",
      entityId: deletedFile.id,
      entityType: "FILE",
      ownerId: deletedFile.userId,
      metadata: {
        doneBy: user?.userName || user?.email,
        fileName: deletedFile.name,
        size: deletedFile.size || 0,
        parentFolderName: parentFolder?.name || "Main Folder",
      },
    });
    return nextResponse(
      { message: "File deleted successfully!", deletedFile },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return nextResponse(
      { message: "Internal Server Error", error },
      { status: 500 },
    );
  }
}
