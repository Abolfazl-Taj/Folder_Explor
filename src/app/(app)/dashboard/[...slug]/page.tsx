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
    console.log(data);

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
    }, [rawData])

    return (
        <div className="w-full relative">
            {isPending ? (<Loading />) :
                <>
                    <div className="w-full flex flex-col p-4 max-h-[550px] overflow-y-auto gap-4">
                        <SortData sortMethod={sortMethod} setSortMethod={setSortMethod} />
                        <span className="shadow w-fit p-2 bg-[#333] rounded-md self-center border border-zinc-900/25 font-semibold">Path: {folderPath}</span>
                        <div className="mt-5 p-2 space-y-2">
                            <Folders data={data?.folders} />
                            <Files queryKey={["folder", folderId]} data={data?.files} />
                        </div>
                    </div>
                    <div className=" w-full max-w-2xl bottom-4 flex justify-between px-20 left-0  mx-auto">
                        <ModalForm type="add" form="file" folderId={folderId} />
                        <ModalForm type="add" folderId={folderId} />
                    </div>
                </>
            }
        </div>
    )
}

export default FolderPage