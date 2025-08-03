"use client"
import { Modal } from "@/types/Modal"
import FolderForm from "./Forms/FolderForm";
import FileForm from "./Forms/FileForm";
const ModalForm = ({ type, data, folderId, form = "folder" , id }: Modal) => {
    switch (form) {
        case "folder":
            return <FolderForm data={data} folderId={folderId} type={type} />
        case "file":
            return <FileForm data={data} folderId={folderId} type={type} id={id} />
    }
}

export default ModalForm