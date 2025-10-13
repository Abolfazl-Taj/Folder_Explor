import nextResponse from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const {
    folderId,
    userId,
    view,
    update,
    delete: perdelete,
    create,
  } = await req.json();
  if (!folderId || !userId) {
    return nextResponse(
      { message: "User or Folder are not sended" },
      { status: 400 }
    );
  }
  try {
    const existedFolder = await prisma.folder.findUnique({
      where: { id: folderId },
      select: { id: true },
    });
    if (!existedFolder) {
      return nextResponse({ message: "Folder are not found" }, { status: 404 });
    }
    const existedUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });
    if (!existedUser) {
      return nextResponse({ message: "user are not found" }, { status: 404 });
    }
    const newPermission = await prisma.folderPermission.create({
      data: {
        canCreate: create,
        canDelete: perdelete,
        canUpdate: update,
        canView: view,
        folderId,
        userId,
      },
    });
    return nextResponse(
      {
        message: "Folder permission created successfully",
        data: newPermission,
      },
      { status: 200 }
    );
  } catch (err) {
    return nextResponse(
      { message: "Internal Server Error", Error: err },
      { status: 500 }
    );
  }
};
