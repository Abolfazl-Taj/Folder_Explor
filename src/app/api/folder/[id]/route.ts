import nextResponse from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const folderId = params.id;
  try {
    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
      include: { files: true },
    });
    if (!folder)
      return nextResponse({ message: "Folder dosent exist!" }, { status: 404 });
    return nextResponse(
      { message: "Folder feched successfully !", folder },
      { status: 200 }
    );
  } catch (err) {
    return nextResponse({ message: "Internal server error"  , err}, { status: 500 });
  }
}
