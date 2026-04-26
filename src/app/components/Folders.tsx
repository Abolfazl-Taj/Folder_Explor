"use client";

import { FolderType } from "@/types/Expo";
import { usePathname, useRouter } from "next/navigation";
import { MdFolderCopy } from "react-icons/md";
import ModalForm from "./ModalForm";
import PassFolder from "./Forms/PassFolder";
import { useState } from "react";

const Folders = ({ data, bin }: { data: FolderType[], bin: boolean }) => {
    const pathName = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [lockedFolder, setLockedFolder] = useState<FolderType | null>(null)
    const router = useRouter()

    const folderLockedHandler = ({ folderData }: { folderData: FolderType }) => {
        if (!folderData.locked) {
            router.push(`${pathName}/${folderData.id}`)
        } else {
            setLockedFolder(folderData)
            setIsOpen(true)
        }
    }

    const handleSuccess = () => {
        // Navigate to the folder only after successful password entry
        if (lockedFolder) {
            router.push(`${pathName}/${lockedFolder.id}`)
        }
        closePasswordModal()
    }

    const closePasswordModal = () => {
        setIsOpen(false)
        setLockedFolder(null)
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
                    <div key={folder.id}>
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
                            {!bin && <ModalForm type="update" data={folder} />}
                            {!bin && <ModalForm type="lock" data={folder} />}
                            {bin && <ModalForm form="restore" entityType="folder" type="restore" id={folder.id} name={folder.name} data={folder} />}
                            <ModalForm type="delete" data={{ id: folder.id, name: folder.name }} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Folders;