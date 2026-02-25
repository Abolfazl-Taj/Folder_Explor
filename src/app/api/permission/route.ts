import createLog from "@/app/lib/createLog";
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
          select: { id: true, userId: true, name: true },
        }),
        prisma.user.findUnique({
          where: { id: userId },
          select: { id: true, userName: true, email: true },
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
    await createLog({
      actor: userId,
      action: "PERMISSION_UPDATE",
      entityId: folderId,
      entityType: "FOLDER",
      ownerId: existedFolder.userId,
      metadata: {
        folderName: existedFolder.name,
        userName: existedUser.userName || existedUser.email,
        newCanView: newPermission.canView,
        newCanCreate: newPermission.canCreate,
        newCanDelete: newPermission.canDelete,
        newCanUpdate: newPermission.canUpdate,
        permissionUpdate: {
          canView: existedPermission?.canView !== newPermission.canView,
          canCreate: existedPermission?.canCreate !== newPermission.canCreate,
          canDelete: existedPermission?.canDelete !== newPermission.canDelete,
          canUpdate: existedPermission?.canUpdate !== newPermission.canUpdate
        }
      }
    })

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
