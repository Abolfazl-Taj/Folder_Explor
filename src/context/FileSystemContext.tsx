import { FileSystemContextType } from "@/types/FileSystem";
import { createContext } from "react";

;

const FileSystemContext = createContext<FileSystemContextType | null | undefined | any>(null)
export default FileSystemContext