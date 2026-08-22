"use client";

import { FolderType } from "@/types/FileSystem";
import { usePathname, useRouter } from "next/navigation";
import { MdFolderCopy } from "react-icons/md";
import ModalForm from "./ModalForm";
import PassFolder from "./Forms/PassFolder";
import { useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

const Folders = ({ data, bin }: { data: FolderType[], bin: boolean }) => {
    const pathName = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [lockedFolder, setLockedFolder] = useState<FolderType | null>(null)
    const router = useRouter()
    const [openRowId, setOpenRowId] = useState<string | null>(null)

    const folderLockedHandler = ({ folderData }: { folderData: FolderType }) => {
        if (!folderData.locked) {
            router.push(`${pathName}/${folderData.id}`)
        } else {
            setLockedFolder(folderData)
            setIsOpen(true)
        }
    }

    const handleSuccess = () => {
        if (lockedFolder) {
            router.push(`${pathName}/${lockedFolder.id}`)
        }
        closePasswordModal()
    }

    const closePasswordModal = () => {
        setIsOpen(false)
        setLockedFolder(null)
    }
    const toggleRow = (folderId: string) => {
        setOpenRowId((prev) => prev === folderId ? null : folderId)
    }
    return (
        <>
            {/* Password Modal - rendered conditionally */}
            {isOpen && lockedFolder && (
                <PassFolder
                    data={lockedFolder}
                    onSuccess={handleSuccess}
                    onClose={closePasswordModal}
                />
            )}

            <div className="flex flex-col gap-4">
                <h2 className="font-bold text-lg">Folders:</h2>

                {data?.map((folder: FolderType) => (
                    <div key={folder.id} className="relative">
                        <div className="group flex w-full items-center gap-3 border-b border-gray-300/20 py-2 px-3 rounded-md transition-all hover:bg-[#222] hover:shadow-md">
                            <button
                                onClick={() => folderLockedHandler({ folderData: folder })}
                                className="flex w-full items-center hover:cursor-pointer"
                            >
                                <div className="flex flex-1 items-center justify-between ">
                                    <div className="flex items-center gap-2 text-white">
                                        <MdFolderCopy className="text-2xl text-red-800 group-hover:text-red-600 transition" />
                                        <span className="font-medium">
                                            {folder.name}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-400">
                                        {new Date(folder.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </button>
                            <div className="gap-2 hidden lg:flex">
                                {!bin && <ModalForm type="update" data={folder} />}
                                {!bin && <ModalForm type="lock" data={folder} />}
                                {bin && <ModalForm form="restore" entityType="folder" type="restore" id={folder.id} name={folder.name} data={folder} />}
                                <ModalForm type="delete" data={{ id: folder.id, name: folder.name }} />
                            </div>
                            <button onClick={() => toggleRow(folder.id)} className={`transition-all lg:hidden ${openRowId === folder.id ? "rotate-180" : "rotate-0"}`}>
                                <BsArrowUp />
                            </button>
                            <div className={`lg:hidden transition-all ${openRowId === folder.id ? "scale-100" : "scale-0"}  absolute right-10 top-3 flex gap-6 z-50 bg-[#111]/20 border border-white/20 backdrop-blur-3xl lg:ap-4 rounded-md  px-4 py-6 `}   >
                                {!bin && <ModalForm type="update" data={folder} />}
                                {!bin && <ModalForm type="lock" data={folder} />}
                                {bin && <ModalForm form="restore" entityType="folder" type="restore" id={folder.id} name={folder.name} data={folder} />}
                                <ModalForm type="delete" data={{ id: folder.id, name: folder.name }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Folders;