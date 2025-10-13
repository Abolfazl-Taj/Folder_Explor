import nextResponse from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export const PATCHHandler = async (req: NextRequest) => {
  const { id, ...body } = await req.json();
  console.log("patch has been sended" , body);
  
  if (!id)
    return nextResponse(
      { message: "Required data not found " },
      { status: 400 }
    );
  try {
    const response = await prisma.folder.update({
      data:  body ,
      where: { id },
    });
    return nextResponse(
      { message: "Folder updated successfully !", response },
      { status: 200 }
    );
  } catch (err) {
    return nextResponse(
      { message: "Internal server error", error: err },
      { status: 500 }
    );
  }
};
