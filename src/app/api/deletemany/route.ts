import nextResponse from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
    const { folderIds, fileIds , logsIds } = await req.json();
    try {
        const deletedItems = await prisma.$transaction([
            prisma.folder.deleteMany({
                where: { id: { in: folderIds } }
            }),
            prisma.file.deleteMany({
                where: { id: { in: fileIds } }
            }),
            prisma.activityLog.deleteMany({
                where: { id: { in: logsIds } }
            })
        ])
        return nextResponse({ data: deletedItems, message: "Items deleted sucessfully!", }, { status: 200 })
    } catch (error) {
        return nextResponse({ message: "Internal Server Error", error }, { status: 500 })
    }
}
