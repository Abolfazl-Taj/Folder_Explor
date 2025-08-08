"use client";

import { getRequest } from "@/app/lib/fetchRequest";
import ExpoContext from "@/context/ExpoContext";
import { FileType, FolderType } from "@/types/Expo";
import { ReactNode, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const ExpoProvider = ({ children }: { children: ReactNode }) => {
    const [folders, setFolders] = useState<FolderType[] | null>(null);
    const [files, setFiles] = useState<FileType[] | null>(null);

    const { isPending, data, error } = useQuery({
        queryKey: ["folder" , null],
        queryFn: () => getRequest({ url: "/api/getall" }),
    });

    useEffect(() => {
        if (data) {
            setFolders(data?.data?.folders);
            setFiles(data?.data?.files);
        }
    }, [data]);

    return (
        <ExpoContext.Provider
            value={{ folders, setFolders, files, setFiles, loading: isPending, error }}
        >
            {children}
        </ExpoContext.Provider>
    );
};

export default ExpoProvider;
