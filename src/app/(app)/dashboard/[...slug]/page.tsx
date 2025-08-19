"use client"
import { getRequest } from "@/app/lib/fetchRequest"
import Folders from "@/app/components/Folders"
import Loading from "@/app/components/Loading"
import ModalForm from "@/app/components/ModalForm"
import { useQuery } from "@tanstack/react-query"
import React, { use, useEffect, useState } from "react"
import Files from "@/app/components/Files"
import SortData from "@/app/components/SortData"
import sortData from "@/app/lib/sortData"
import Image from "next/image"

const FolderPage = ({ params }: { params: { slug?: string[] } }) => {
    const unwarpedSlug: string[] = use(params).slug
    const folderId = unwarpedSlug.at(-1)
    const [sortMethod, setSortMethod] = useState({ type: "sort", field: "name" })
    const [data, setData] = useState<any>()
    const [folderPath, setFodlerPath] = useState("")
    const { data: rawData, isPending, error } = useQuery({
        queryKey: ["folder", folderId],
        queryFn: () => getRequest({ url: `/api/folder/${folderId}` })
    })
    useEffect(() => {
        
        if (!isPending) {
            setFodlerPath([
                'Main Folder',
                rawData.folder.parent?.name,
                rawData.folder.name,
            ].filter(Boolean).join('/'))
            const sortedFolder = rawData.folder.children && sortData(rawData.folder.children, sortMethod.type, sortMethod.field)
            const sortedFile = rawData.folder.files && sortData(rawData.folder.files, sortMethod.type, sortMethod.field)
            setData({ files: sortedFile, folders: sortedFolder })
        }
    }, [rawData , sortMethod])

    return (
        <div className="flex-1 p-4 space-y-3 flex flex-col relative">
            {isPending ? (
                <Loading />
            ) : data?.folders?.length !== 0 && data?.files?.length !== 0 ? (
                <>
                    <SortData sortMethod={sortMethod} setSortMethod={setSortMethod} />
                    <span className="shadow w-fit p-2 bg-[#333] rounded-md self-center border border-zinc-900/25 font-semibold">Path: {folderPath}</span>

                    <div className="max-h-full overflow-y-auto flex flex-col gap-4">
                        <Folders data={data?.folders} />
                        <Files queryKey={["folder", null]} data={data?.files} />
                    </div>
                </>
            ) : (
                <div className="text-sm text-gray-400 italic w-full h-full flex flex-col justify-center items-center p-6">
                    <Image
                        src="/noFolder.webp"
                        width={150}
                        height={150}
                        className="w-auto h-auto mb-5"
                        alt="Empty folder illustration"
                    />
                    <h1 className="text-lg font-bold text-red-700 mb-3">
                        This folder’s emptier than your brain, you absolute goober.
                    </h1>
                    <p className="text-white max-w-xs text-center">
                        Stop staring and start adding something — to this folder and if you can you little brain
                    </p>
                </div>
            )}

            <div className=" w-full max-w-2xl bottom-4 flex justify-between px-20 left-0  mx-auto">
                <ModalForm type="add" form="file" folderId={null} />
                <ModalForm type="add" />
            </div>
        </div >
    )
}

export default FolderPage