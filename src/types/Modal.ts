import { FolderType } from "./Expo";

export type Modal = {
    type: "add" | "delete" | "update";
    data?: FolderType | any;
    folderId?: string | null
    form?: "folder" | "file" | "permission"
    id?: string
    permissions?: any
}