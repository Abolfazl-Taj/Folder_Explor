import createLog from "@/app/lib/createLog";
import getUserId from "@/app/lib/getUserId";
import nextResponse from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export const PATCHHandler = async (req: NextRequest) => {
  const { id, ...body } = await req.json();
  const userId = getUserId(req);
  if (!id)
    return nextResponse(
      { message: "Required data not found " },
      { status: 401 },
    );
  try {
    const folder = await prisma.folder.findUnique({
      where: { id },
      select: { id: true, userId: true, name: true },
    });
    const findUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, userName: true },
    });
    if (!folder)
      return nextResponse({ message: "Folder not found" }, { status: 404 });
    const response = await prisma.folder.update({
      data: body,
      where: { id },
    });
    await createLog({
      action: "FOLDER_RENAME",
      actor: userId,
      entityId: id,
      entityType: "FOLDER",
      ownerId: folder.userId,
      metadata: {
        prvName: folder.name,
        newName: response.name,
        doneBy: findUser?.userName || findUser?.email,
        desc: `Folder Name changed from '${folder.name}' to '${response.name}' by ${findUser?.email || findUser?.userName}`,
      },
    });
    return nextResponse(
      { message: "Folder updated successfully !", response },
      { status: 200 },
    );
  } catch (err) {
    return nextResponse(
      { message: "Internal server error", error: err },
      { status: 500 },
    );
  }
};
