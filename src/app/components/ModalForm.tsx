"use client"
import { Modal } from "@/types/Modal"
import FolderForm from "./Forms/FolderForm";
import FileForm from "./Forms/FileForm";
import PermissionForm from "./Forms/PermissionForm";
const ModalForm = ({ type, data, folderId, form = "folder" , id  , accessedBy}: Modal) => {
    switch (form) {
        case "folder":
            return <FolderForm data={data} folderId={folderId} type={type} />
        case "file":
            return <FileForm data={data} folderId={folderId} type={type} id={id} />
        case "permission":
            return <PermissionForm  folderId={folderId || ""}  accessedBy={accessedBy} />
    }
}

export default ModalForm