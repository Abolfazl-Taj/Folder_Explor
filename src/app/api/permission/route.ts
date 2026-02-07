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
      { status: 400 },
    );
  }
  try {
    const [existedFolder, existedUser, existedPermission] =
      await prisma.$transaction([
        prisma.folder.findUnique({
          where: { id: folderId },
          select: { id: true },
        }),
        prisma.user.findUnique({
          where: { id: userId },
          select: { id: true },
        }),
        prisma.folderPermission.findUnique({
          where: { folderId_userId: { userId, folderId } },
        }),
      ]);
    if (!existedFolder) {
      return nextResponse({ message: "Folder are not found" }, { status: 404 });
    }
    if (!existedUser) {
      return nextResponse({ message: "user are not found" }, { status: 404 });
    }
    if (existedPermission) {
      const updatedPermission = await prisma.folderPermission.update({
        where: {
          userId: existedPermission.userId,
          id: existedPermission.id,
          folderId: existedPermission.folderId,
        },
        data: {
          canCreate: create,
          canDelete: perdelete,
          canUpdate: update,
          canView: view,
        },
      });
      return nextResponse(
        {
          message: "Folder permission updated successfully!",
          data: updatedPermission,
        },
        { status: 200 },
      );
    }
    const newPermission = await prisma.folderPermission.create({
      data: {
        canCreate: create,
        canDelete: perdelete,
        canUpdate: update,
        canView: view,
        folderId: existedFolder.id,
        userId: existedUser.id,
      },
    });
    return nextResponse(
      {
        message: "Folder permission created successfully",
        data: newPermission,
      },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return nextResponse(
      { message: "Internal Server Error", Error: err },
      { status: 500 },
    );
  }
};
