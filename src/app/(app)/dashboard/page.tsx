"use client"
import Files from "@/app/components/Files";
import Folders from "@/app/components/Folders";
import Loading from "@/app/components/Loading";
import ModalForm from "@/app/components/ModalForm";
import SortData from "@/app/components/SortData";
import sortData from "@/app/lib/sortData";
import useExpo from "@/hooks/useExpo"
import Image from "next/image";
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
      ) : folders?.length !== 0 || files?.length !== 0 ? (
        <>
          <div className="max-h-full overflow-y-auto flex flex-col gap-4">
            <Folders data={data?.folders} />
            <Files queryKey={["folder", null]} data={data?.files} />
          </div>
        </>
      ) : (
        <div className="text-sm text-gray-400 italic w-full h-full flex flex-col justify-center items-center p-6">
          <Image
            src="/noFolder.webp"
            width={150}
            height={150}
            className="w-auto h-auto mb-5"
            alt="Empty folder illustration"
          />
          <h1 className="text-lg font-bold text-red-700 mb-3">
            This folder’s emptier than your brain, you absolute goober.
          </h1>
          <p className="text-white max-w-xs text-center">
            Stop staring and start adding something — to this folder and if you can you little brain
          </p>
        </div>
      )}

      <div className=" w-full max-w-2xl bottom-4 flex justify-between px-20 left-0  mx-auto">
        <ModalForm type="add" form="file" folderId={null} />
        <ModalForm type="add" />
      </div>
    </div >

  )
}

export default Dashboard
