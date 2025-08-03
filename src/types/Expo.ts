import { Dispatch, SetStateAction } from "react";

export type FileType = {
  id: string;
  name: string;
  createdAt: any;
  content?: string;
  folderId?: string;
  updatedAt?: any;
  size : number
  userId: string;
};

export type FolderType = {
  id: string;
  userId: string;
  files?: FileType[];
  name: string;
  createdAt: any;
  updatedAt?: any;
  parentId?: string;
};

export type ExpoContextType = {
  files: FileType[] | null;
  setFiles: Dispatch<SetStateAction<FileType[] | null>>;
  folders: FolderType[] | null;
  setFolders: Dispatch<SetStateAction<FolderType[] | null>>;
};
