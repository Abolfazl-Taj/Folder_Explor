import getUserId from "@/app/lib/getUserId";
import nextResponse, { nextRedirect } from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";
import { fileTypeFromBuffer } from "file-type";
import extensionToMime from "@/app/lib/extensionToMime ";

export const POSTHandler = async (req: NextRequest) => {
  try {
    const contentType = req.headers.get("content-type") || "";
    const userId = getUserId(req);
    if (!userId) return nextRedirect("/login", req.url);

    let name: string;
    let folderId: string | null = null;
    let content: any = "";
    let mimeType: string;
    let size: number;

    // ✅ Case 1: File Upload (multipart/form-data)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const uploadedFile = formData.get("file") as File | null;
      const formName = formData.get("name") as string | null;
      const formFolderId = formData.get("folderId") as string | null;

      if (!uploadedFile) {
        return nextResponse({ message: "No file uploaded!" }, { status: 400 });
      }

      const arrayBuffer = await uploadedFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      content = buffer;
      name = formName || uploadedFile.name;
      folderId = formFolderId || null;
      size = buffer.length;

      const detectedType = await fileTypeFromBuffer(buffer);
      mimeType =
        detectedType?.mime || uploadedFile.type || "application/octet-stream";

      // ✅ Case 2: Manual JSON file creation
    } else if (contentType.includes("application/json")) {
      const body = await req.json();
      name = body.name;
      folderId = body.folderId || null;
      content = Buffer.from(body.content, "utf-8");
      if (!name || typeof content !== "string") {
        return nextResponse({ message: "Invalid input" }, { status: 400 });
      }

      size = content.length;

      const ext = "." + name.split(".").pop()?.toLowerCase();
      mimeType = extensionToMime[ext] || "text/plain";
    } else {
      return nextResponse(
        { message: "Unsupported content type" },
        { status: 415 }
      );
    }

    // ✅ Save to database
    const file = await prisma.file.create({
      data: {
        name,
        userId,
        folderId,
        content: content || null, // stored as string
        mimeType: mimeType || null,
        size, // stored as bytes
      },
    });

    return nextResponse(
      { message: "File saved successfully!", file },
      { status: 201 }
    );
  } catch (err) {
    console.error("File save error:", err);
    return nextResponse(
      {
        message: "Internal Server Error",
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
};
