import nextResponse from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const {id} = await params;
    console.log(id);
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return nextResponse({ message: "User not found" }, { status: 404 });
    }
    return nextResponse(
      { message: "User found successfully", data: user },
      { status: 200 }
    );
  } catch (err) {
    return nextResponse(
      { message: "Internal Server Error", error: err },
      { status: 500 }
    );
  }
};
