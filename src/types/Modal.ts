import { FolderType } from "./Expo";

export type Modal = {
    type: "add" | "delete" | "update" | "restore" | "lock";
    data?: FolderType | any;
    folderId?: string | null
    form?: "folder" | "file" | "permission" |"restore"
    id?: string
    permissions?: any,
    name?: string
    entityType? : "file" | "folder"
}