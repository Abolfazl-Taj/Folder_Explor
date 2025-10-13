import nextResponse from "@/app/lib/nextResponse";
import { NextRequest } from "next/server";
import { DELETEHandler } from "../handlers/delete";
import prisma from "@/app/lib/prisma";
import getUserId from "@/app/lib/getUserId";
import { permission } from "process";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const folderId = id;
  const userId = getUserId(req);
  try {
    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
      include: {
        files: true,
        children: true,
        user: false,
        parent: { select: { name: true } },
        permissions: true,
      },
    });
    if (!folder)
      return nextResponse({ message: "Folder dosent exist!" }, { status: 404 });
    if (!userId)
      return nextResponse({ message: "User id not found" }, { status: 404 });
    const userPemissionExiste = folder.permissions.find((u) => u.id === userId);
    if (folder.private) {
      if (userId === folder.userId || userPemissionExiste?.canUpdate) {
        return nextResponse(
          { message: "Folder feched successfully !", folder },
          { status: 200 }
        );
      } else {
        return nextResponse({ message: "Unauthorized" }, { status: 401 });
      }
    } else {
      return nextResponse(
        { message: "Folder feched successfully !", folder },
        { status: 200 }
      );
    }
  } catch (err) {
    return nextResponse(
      { message: "Internal server error", err },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  return DELETEHandler(id);
}
