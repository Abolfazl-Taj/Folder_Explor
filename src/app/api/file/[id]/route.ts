import getUserId from "@/app/lib/getUserId";
import nextResponse, { nextRedirect } from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { DELETEHandler } from "../handlers/delete";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = await params;
    const userId = getUserId(req);
    if (!userId) return NextResponse.redirect("/login");

    const file = await prisma.file.findUnique({
      where: { id, userId },
      include: { folder: true, user: { select: { email: true } } },
    });

    if (!file || !file.content) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    // Convert Buffer (binary) to base64 for JSON
    const base64Content = Buffer.isBuffer(file.content)
      ? file.content.toString("base64")
      : Buffer.from(file.content).toString("base64");
    return NextResponse.json({
      message: "File fetched successfully!",
      file: {
        ...file,
        content: base64Content, // ✅ safe for JSON
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
};

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  return DELETEHandler(id);
}
