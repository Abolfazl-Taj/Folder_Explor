"use client";

import { getRequest } from "@/app/lib/fetchRequest";
import ExpoContext from "@/context/FileSystemContext";
import { FileType, FolderType } from "@/types/FileSystem";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const FileSystemProvider = ({ children }: { children: ReactNode }) => {
    const [folders, setFolders] = useState<FolderType[] | null>(null);
    const [files, setFiles] = useState<FileType[] | null>(null);
    const [safeData, setSafeData] = useState({})

    const { isPending, data, error } = useQuery({
        queryKey: ["folder", null],
        queryFn: () => getRequest({ url: "/api/getall" }),
    });

    useEffect(() => {
        if (data) {
            setFolders(data?.data?.folders);
            setFiles(data?.data?.files);
            setSafeData({
                folders: data?.data?.folders,
                files: data?.data?.files

            })
        }
    }, [data]);

    return (
        <ExpoContext.Provider
            value={{ folders, setFolders, files, setFiles, loading: isPending, error, safeData }}
        >
            {children}
        </ExpoContext.Provider>
    );
};

export default FileSystemProvider;
