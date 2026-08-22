import createLog from "@/app/lib/createLog";
import getUserId from "@/app/lib/getUserId";
import nextResponse from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export const DELETE = async (req: NextRequest, id) => {
    const userId = getUserId(req)
    if (!id) {
        return nextResponse({ message: "User id is required" }, { status: 400 });
    }
    const finduser = await prisma.user.findUnique({
        where: { id }
    })
    if (finduser) {
        return nextResponse({ message: "User id is invalid" }, { status: 400 })
    }
    try {
        const deletedUser = await prisma.user.delete({ where: { id } })
        await createLog({ action: "USER_DELETE", actor: userId, entityId: id, ownerId: userId, entityType: "USER" })
        return nextResponse(
            { message: "Folder deleted successfully!", deletedUser },
            { status: 200 },
        );
    } catch (error) {
        console.log(error);
        return nextResponse(
            { message: "Internal Server Error", error },
            { status: 500 },
        );
    }


}