"use client";

import { FolderType } from "@/types/Expo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdFolderCopy } from "react-icons/md";
import ModalForm from "./ModalForm";



const Folders = ({ data, bin }: { data: FolderType[], bin: boolean }) => {
    const pathName = usePathname()
    return (
        <div className="flex flex-col gap-4">
            <h2 className="font-bold text-lg">Folders:</h2>

            {data?.map((folder: FolderType) => (
                <div key={folder.id}>
                    <div key={folder.id}
                        className="group flex w-full items-center gap-3 border-b border-gray-300/20 py-2 px-3 rounded-md transition-all hover:bg-[#222] hover:shadow-md">

                        <Link
                            href={!bin ? `${pathName}/${folder.id}` : ""}
                            className="flex w-full items-center"
                        >
                            <div className="flex flex-1 items-center justify-between ">
                                <div className="flex items-center gap-2 text-white">
                                    <MdFolderCopy className="text-2xl text-red-800 group-hover:text-red-600 transition" />
                                    <span className="font-medium">{folder.name}</span>
                                </div>
                                <span className="text-xs text-gray-400">
                                    {new Date(folder.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </Link>
                        {!bin && <ModalForm type="update" data={folder} />}
                        <ModalForm type="delete" data={{ id: folder.id, name: folder.name }} />
                    </div >
                </div>
            ))}
        </div>
    );
};

export default Folders;
