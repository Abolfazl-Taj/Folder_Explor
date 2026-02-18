import prisma from "@/app/lib/prisma";
import nextResponse, { nextRedirect } from "@/app/lib/nextResponse";
import { NextRequest } from "next/server";
import createLog from "@/app/lib/createLog";
import getUserId from "@/app/lib/getUserId";

export async function POSTHandler(req: NextRequest) {
  const token =
    req.cookies.get("token")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");
  const { name, parentId } = await req.json();
  if (!token) return nextRedirect("/login", req.url);
  const userId = getUserId(req);

  if (!name) {
    return nextResponse({ message: "Folder name required!" }, { status: 400 });
  }
  if (!userId) {
    return nextResponse({ message: "User id required!" }, { status: 400 });
  }
  try {
    const parentFolder = parentId
      ? await prisma.folder.findUnique({
          where: { id: parentId },
          select: {
            permissions: true,
            userId: true,
          },
        })
      : null;

    const isAuthorizedUser =
      parentFolder?.userId === userId ||
      parentFolder?.permissions.find((u) => u.userId === userId)?.canCreate ||
      !parentFolder?.userId ||
      parentId == null;
    if (isAuthorizedUser) {
      const folder = await prisma.folder.create({
        data: { name, userId, parentId },
        include: { user: { select: { userName: true, email: true } } },
      });
      console.log("Parent Folder id", parentFolder);
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { userName: true, email: true },
      });

      await createLog({
        action: "FOLDER_CREATE",
        actor: userId,
        entityType: "FOLDER",
        entityId: folder.id,
        ownerId: parentFolder ? parentFolder.userId : userId,
        metadata: {
          doneBy: user?.userName || user?.email,
          folderName: folder.name,
          desc: `Creating a folder called ${folder.name} by ${folder.user.userName || folder.user.email}`,
        },
      });
      return nextResponse(
        { message: "Folder created successfully ", folder },
        { status: 200 },
      );
    } else {
      return nextResponse({ message: "Unauthorzied" }, { status: 401 });
    }
  } catch (error) {
    console.log(error);
    return nextResponse(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}
