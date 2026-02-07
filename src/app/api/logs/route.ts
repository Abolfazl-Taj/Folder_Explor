import getUserId from "@/app/lib/getUserId";
import nextResponse from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;
  const userId = getUserId(req);
  if (!userId || !token)
    return nextResponse({ message: "Unauthorized" }, { status: 401 });
  try {
    const Logs = await prisma.activityLog.findMany({
      where: { targetOwnerId: userId },
    });
    return nextResponse(
      { message: "Loges fetched sucessfully!", data: Logs },
      { status: 200 },
    );
  } catch (error) {
      console.log(error);
      
    return nextResponse(
      { message: "Internal Server Error", error },
      { status: 500 },
    );
  }
};
