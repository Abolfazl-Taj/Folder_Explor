import getUserId from "@/app/lib/getUserId";
import nextResponse, { nextRedirect } from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";
import { DELETEHandler } from "../handlers/delete";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = await params.id;
    const userId = getUserId(req);
    if (!userId) return nextRedirect("/login", req);
    const file = await prisma.file.findUnique({
      where: { id, userId },
      include: { folder: true, user: { select: { email: true } } },
    });
    if (!file)
      return nextResponse({ message: "File not found " }, { status: 404 });
    return nextResponse(
      {
        message: "File fetched successfully! ",
        file: {
          ...file,
          content: file.content?.toString(),
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return nextResponse(
      { message: "Internal server error", error: err },
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
