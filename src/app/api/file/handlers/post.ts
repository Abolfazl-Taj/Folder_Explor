import getUserId from "@/app/lib/getUserId";
import nextResponse, { nextRedirect } from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";
import { fileTypeFromBuffer } from "file-type";
import extensionToMime from "@/app/lib/extensionToMime ";
import createLog from "@/app/lib/createLog";

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
      if (!name || typeof content !== "string") {
        return nextResponse({ message: "Invalid input" }, { status: 400 });
      }
      content = Buffer.from(body.content, "utf-8");

      size = content.length;

      const ext = "." + name.split(".").pop()?.toLowerCase();
      mimeType = extensionToMime[ext] || "text/plain";
    } else {
      return nextResponse(
        { message: "Unsupported content type" },
        { status: 415 },
      );
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { userName: true, email: true },
    });
    // ✅ Save to database
    if (folderId !== null) {
      const parentFolder = await prisma.folder.findUnique({
        where: { id: folderId },
        select: {
          name: true,
          userId: true,
          permissions: {
            select: { userId: true, canCreate: true },
          },
        },
      });
      if (!parentFolder)
        return nextResponse({ message: "Folder not found" }, { status: 404 });

      const isAuthorizedUser =
        parentFolder.userId === userId ||
        parentFolder.permissions.find((u) => u.userId === userId)?.canCreate;
      if (isAuthorizedUser) {
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
        await createLog({
          actor: userId,
          entityId: file.id,
          action: "FILE_UPLOAD",
          entityType: "FILE",
          ownerId: parentFolder?.userId,
          metadata: {
            doneBy: user?.userName || user?.email,
            folderName: parentFolder.name,
            fileName: file.name,
            fileSize: size || 0,
          },
        });
        return nextResponse(
          { message: "File saved successfully!", file },
          { status: 201 },
        );
      } else {
        return nextResponse({ message: "Unauthorized" }, { status: 401 });
      }
    } else if (folderId === null) {
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
      await createLog({
        actor: userId,
        entityId: file.id,
        action: "FILE_UPLOAD",
        entityType: "FILE",
        ownerId: userId,
        metadata: {
          doneBy: user?.userName || user?.email,
          folderName: "Main Folder",
          fileName: file.name,
          fileSize: size || 0,
        },
      });
      return nextResponse(
        { message: "File created sucessfully!", data: file },
        { status: 200 },
      );
    }
  } catch (err) {
    console.error("File save error:", err);
    return nextResponse(
      {
        message: "Internal Server Error",
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
};
