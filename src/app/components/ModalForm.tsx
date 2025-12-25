"use client"
import { Modal } from "@/types/Modal"
import FolderForm from "./Forms/FolderForm";
import FileForm from "./Forms/FileForm";
import PermissionForm from "./Forms/PermissionForm";
const ModalForm = ({ type, data, folderId, form = "folder", id   , permissions}: Modal) => {    
    const Forms: { [key: string]: any } = {
        "folder": <FolderForm data={data} folderId={folderId} type={type} />,
        "file": <FileForm data={data} folderId={folderId} type={type} id={id} />,
        "permission": <PermissionForm folderId={folderId || ""} permissions={permissions || []} />
    }
    return Forms[form]
}

export default ModalForm