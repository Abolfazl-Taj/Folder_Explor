import nextResponse from "@/app/lib/nextResponse";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string[] } }
) {
    const { id } = await params;
    try {
        const ids = id.
            console.log("ids are this one look", ids);
        // const deletedItems = await prisma.folder.deleteMany({ where: { id } })
        // return nextResponse({ data: deletedItems, message: "Items deleted sucessfully!", }, { status: 200 })
    } catch (error) {
        const ids = id.join(",")
        console.log("ids are this one look", ids);
        return nextResponse({ message: "Internal Server Error", error }, { status: 500 })
    }
}