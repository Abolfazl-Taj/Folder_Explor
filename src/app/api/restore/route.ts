import createLog from "@/app/lib/createLog";
import getUserId from "@/app/lib/getUserId";
import nextResponse from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const { id, entityType } = await req.json()
    const userId = getUserId(req);
    if (!userId) return nextResponse({ message: "User not found" }, { status: 401 })
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { userName: true, email: true } })
    const Item = entityType === "file" ? await prisma.file.findUnique({ where: { id }, select: { name: true, folder: { select: { name: true } } } }) : await prisma.folder.findUnique({ where: { id }, select: { name: true, parent: { select: { name: true } } } })
    const restoredItem = entityType === "file" ? await prisma.file.update({ where: { id }, data: { deleted: false } }) : await prisma.folder.update({ where: { id }, data: { deleted: false } })
    await createLog({
        action: entityType === "file" ? "FILE_RESTORED" : "FOLDER_RESTORED",
        actor: userId,
        entityId: id,
        entityType: entityType === "file" ? "FILE" : "FOLDER",
        ownerId: userId,
        metadata: {
            doneBy: user?.userName || user?.email,
            itemName: Item?.name,
            parentName: entityType === "file" ? Item?.folder?.name || "Main" : Item?.parent?.name || "Main",
        }
    })
    return nextResponse({ message: "Item restored successfully!", data: restoredItem }, { status: 200 })

}
