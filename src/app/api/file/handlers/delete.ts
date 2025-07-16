import nextResponse from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export const DELETEHanlder = async (req: NextRequest) => {
  try {
    const { fileId } = await req.json();
    if (!fileId)
      return nextResponse(
        { message: "File id is requierd !" },
        { status: 400 }
      );
    const deletedFile = prisma.file.delete({ where: { id: fileId } });
    if (!deletedFile)
      return nextResponse({ message: "File dose not exist" }, { status: 404 });
    return nextResponse(
      { message: "File deleted successfully", deletedFile },
      { status: 200 }
    );
  } catch (err) {
    return nextResponse(
      { message: "Internal server error", error: err },
      { status: 500 }
    );
  }
};
