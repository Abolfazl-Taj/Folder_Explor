import createLog from "@/app/lib/createLog";
import getUserId from "@/app/lib/getUserId";
import nextResponse from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export const PATCHHandler = async (req: NextRequest) => {
  try {
    const userId = getUserId(req);
    const { id, name, content } = await req.json();

    if (!id) {
      return nextResponse({ message: "id is required!" }, { status: 400 });
    }

    const file = await prisma.file.findUnique({ where: { id } });
    if (!file) {
      return nextResponse({ message: "File not found" }, { status: 404 });
    }

    // Convert content string to Buffer if provided
    let contentBuffer: Buffer | any = null;
    let size = file.size;

    contentBuffer = content ? Buffer.from(content, "utf-8") : null;
    size = contentBuffer ? contentBuffer.length : null;
    const basedContent = contentBuffer && contentBuffer.toString("base64");

    const updatedFile = await prisma.file.update({
      where: { id },
      data: {
        name: name ?? file.name,
        content: content ? basedContent : file.content,
        size: size ?? file.size,
      },
      select: { name: true, content: true, size: true },
    });
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { userName: true, email: true },
    });
    await createLog({
      actor: userId,
      entityId: file.id,
      entityType: "FILE",
      ownerId: file.userId,
      action: "FILE_UPDATE",
      metadata: {
        doneBy: user?.userName || user?.email,
        fileName: file?.name,
        fileId: file?.id,
        size: size,
        typeOfChange: {
          content: Boolean(content),
          name: Boolean(name),
          size: size ? size === file.size : false,
        },
        newFileName: updatedFile.name,
        newSize: updatedFile.size,
      },
    });
    return nextResponse(
      { message: "File updated successfully!", data: updatedFile },
      { status: 200 },
    );
  } catch (err) {
    console.error("PATCH error:", err);
    return nextResponse(
      { message: "Internal Server Error", error: String(err) },
      { status: 500 },
    );
  }
};
