import ViewUserComponent from "@/app/components/ViewUserComponent";
import getCurrentUserId from "@/app/lib/getCurrentUserId"
import prisma from "@/app/lib/prisma"
import { notFound } from "next/navigation";
const AdminPanelPage = async () => {
    const id = await getCurrentUserId()
    const isAdmin = await prisma.user.findUnique({
        where: { id },
        select: { isAdmin: true }
    }).then(u => u.isAdmin)
    if (!isAdmin) {
        return (
            notFound()
        )
    }
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            userName: true,
            img: true,
            _count: {
                select: { folders: true, files: true }
            }
        }
    })
    return (
        <div className="w-full h-[500px] overflow-y-auto px-3 py-4 
                rounded-xl border border-zinc-900 
                scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800 
                hover:scrollbar-thumb-red-900/60">
            <ViewUserComponent users={users} />

        </div>
    )
}

export default AdminPanelPage