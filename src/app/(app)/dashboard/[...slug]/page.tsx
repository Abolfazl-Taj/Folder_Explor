"use client"
import { getRequest } from "@/app/lib/fetchRequest"
import Folders from "@/app/components/Folders"
import Loading from "@/app/components/Loading"
import ModalForm from "@/app/components/ModalForm"
import { useQuery } from "@tanstack/react-query"
import React, { use, useEffect, useState } from "react"
import Files from "@/app/components/Files"

const FolderPage = ({ params }: { params: { slug?: string[] } }) => {
    const unwarpedSlug: string[] = use(params).slug
    const folderId = unwarpedSlug.at(-1)
    const [folderPath, setFodlerPath] = useState("")
    const { data, isPending, error } = useQuery({
        queryKey: ["folder", folderId],
        queryFn: () => getRequest({ url: `/api/folder/${folderId}` })
    })
    console.log(data);

    useEffect(() => {
        if (!isPending) {
            setFodlerPath([
                'Main Folder',
                data.folder.parent?.name,
                data.folder.name,
            ].filter(Boolean).join('/'))
        }

    }, [data])

    return (
        <div className="w-full relative">
            {isPending ? (<Loading />) :
                <div className="w-full flex flex-col p-4 max-h-[550px] overflow-y-auto">
                    <span className="shadow w-fit p-2 bg-[#333] rounded-md self-center border border-zinc-900/25 font-semibold">Path: {folderPath}</span>
                    <div className="mt-5 p-2 space-y-2">
                        <Folders data={data?.folder.children} />
                        <Files queryKey={["folder", folderId]} data={data?.folder.files} />
                    </div>
                </div>
            }
            <div className=" w-full max-w-2xl bottom-4 flex justify-between px-20 left-0  mx-auto">
                <ModalForm type="add" form="file" folderId={folderId} />
                <ModalForm type="add" folderId={folderId} />
            </div>
        </div>
    )
}

export default FolderPage