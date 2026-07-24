"use client"

import Files from "@/app/components/Files"
import Folders from "@/app/components/Folders"
import Loading from "@/app/components/Loading"
import SortData from "@/app/components/SortData"
import sortData from "@/app/lib/sortData"
import { Folder, File } from "@/generated/prisma"
import useExpo from "@/hooks/useExpo"
import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FiTrash2 } from "react-icons/fi"
import { HiOutlineRefresh } from "react-icons/hi"
import { IoIosWarning } from "react-icons/io"
import { toast } from "react-toastify"

const RecycleBinPage = () => {
    const { folders, files, loading } = useExpo()
    const [data, setData] = useState<{ files?: File[]; folders?: Folder[] }>({})
    const router = useRouter()
    const [sortMethod, setSortMethod] = useState({
        type: "sort",
        field: "deletedAt",
    })
    const queryClinet = useQueryClient()
    useEffect(() => {
        const visualFolders =
            folders?.filter((f: Folder) => f.deleted) || []

        const visualFiles =
            files?.filter((f: File) => f.deleted) || []

        const sortedFolder = sortData(
            visualFolders,
            sortMethod.type,
            sortMethod.field
        )

        const sortedFile = sortData(
            visualFiles,
            sortMethod.type,
            sortMethod.field
        )

        setData({ files: sortedFile, folders: sortedFolder })
    }, [files, folders, sortMethod])

    const isEmpty =
        (data?.folders?.length ?? 0) === 0 &&
        (data?.files?.length ?? 0) === 0

    const deleteManyHandler = async () => {
        const folderIds = data?.folders?.filter(f => f.deleted).map(f => f.id)
        const fileIds = data.files.filter(f => f.deleted).map(f => f.id)
        axios.delete(`/api/deletemany`, {
            data: {
                folderIds,
                fileIds
            }
        }).then(() => {
            queryClinet.invalidateQueries()
            toast.success("Recycle bin got cleared sucessfully")
            router.push("/dashboard")
        })
    }
    return (
        <div className="flex-1 p-6 flex flex-col space-y-6 relative  text-white">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-3 w-1/3">
                    <FiTrash2 className="text-red-500 text-2xl" />
                    <h1 className="text-2xl font-bold">Recycle Bin</h1>
                </div>

                <div className="flex items-center gap-4 w-full justify-end">
                    <div className="w-1/3">
                        <SortData
                            sortMethod={sortMethod}
                            setSortMethod={setSortMethod}
                        />
                    </div>

                    {!isEmpty && (
                        <button onClick={deleteManyHandler} className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-lg text-sm font-semibol">
                            <IoIosWarning className="text-2xl" />
                            <span>Clear the bin</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <Loading />
            ) : !isEmpty ? (
                <div className="flex flex-col gap-6 overflow-y-auto">
                    <Folders bin={true} data={data?.folders} />
                    <Files bin={true} queryKey={["recycle-bin"]} data={data?.files} />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-zinc-400">

                    <FiTrash2 className="text-6xl text-zinc-700" />

                    <h2 className="text-xl font-semibold text-zinc-300">
                        Your Recycle Bin is empty
                    </h2>

                    <p className="max-w-sm text-sm text-zinc-500">
                        Deleted files and folders will appear here.
                        You can restore them or permanently remove them later.
                    </p>
                </div>
            )}

            {/* Info Footer */}
            {!isEmpty && (
                <div className="text-xs text-zinc-500 flex items-center gap-2 border-t border-zinc-800 pt-3">
                    <HiOutlineRefresh />
                    Items in the recycle bin may be permanently deleted after 30 days.
                </div>
            )}
        </div>
    )
}

export default RecycleBinPage