"use client"
import Files from "@/app/components/Files";
import Folders from "@/app/components/Folders";
import Loading from "@/app/components/Loading";
import ModalForm from "@/app/components/ModalForm";
import SortData from "@/app/components/SortData";
import sortData from "@/app/lib/sortData";
import useExpo from "@/hooks/useExpo"
import { useEffect, useState } from "react";



const Dashboard = () => {
  const { folders, files, loading, error } = useExpo();
  const [data, setData] = useState()
  const [sortMethod, setSortMethod] = useState({ type: "sort", field: "name" })
  useEffect(() => {
    const sortedFolder = folders && sortData(folders, sortMethod.type, sortMethod.field)
    const sortedFile = files && sortData(files, sortMethod.type, sortMethod.field)
    setData({ files: sortedFile, folders: sortedFolder })
  }, [files, folders, sortMethod])

  return (
    <div className="flex-1 p-4 space-y-3 flex flex-col relative">
      <SortData sortMethod={sortMethod} setSortMethod={setSortMethod} />
      <span className="shadow w-fit p-2 bg-[#333] rounded-md self-center border border-zinc-900/25 font-semibold">Path: {`Main Folder`}</span>

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="max-h-full overflow-y-auto flex flex-col gap-4">
            <Folders data={data?.folders} />
            <Files queryKey={["folder", null]} data={data?.files} />
          </div>
          <div className=" w-full max-w-2xl bottom-4 flex justify-between px-20 left-0  mx-auto">
            <ModalForm type="add" form="file" folderId={null} />
            <ModalForm type="add" />
          </div>
        </>
      )}
    </div>

  )
}

export default Dashboard
