import nextResponse from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export const PATCHHandler = async (req: NextRequest) => {
  try {
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

    contentBuffer = Buffer.from(content, "utf-8");
    size = contentBuffer.length;
    const basedContent = contentBuffer.toString("base64")

    const updatedFile = await prisma.file.update({
      where: { id },
      data: {
        name: name ?? file.name,
        content: content ? basedContent : file.content,
        size: size ?? file.size,
      },
    });

    return nextResponse(
      { message: "File updated successfully!", data: updatedFile },
      { status: 200 }
    );
  } catch (err) {
    console.error("PATCH error:", err);
    return nextResponse(
      { message: "Internal Server Error", error: String(err) },
      { status: 500 }
    );
  }
};
