"use client"
import Files from "@/app/components/Files";
import Folders from "@/app/components/Folders";
import Loading from "@/app/components/Loading";
import ModalForm from "@/app/components/ModalForm";
import sortData from "@/app/lib/sortData";
import useExpo from "@/hooks/useExpo"
import { useEffect, useState } from "react";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import { LuCalendarMinus, LuCalendarPlus } from "react-icons/lu";


const Dashboard = () => {
  const { folders, files, loading, error } = useExpo();
  const [data, setData] = useState()
  useEffect(() => {
    setData({ files, folders })
  }, [files, folders])
  const sortOptions = [
    { icon: <FaSortAlphaDown />, type: "sort", action: "name" },
    { icon: <FaSortAlphaDownAlt />, type: "reverse", action: "name" },
    { icon: <LuCalendarPlus />, type: "sort", action: "date" },
    { icon: <LuCalendarMinus />, type: "reverse", action: "date" },
  ] as const;
  return (
    <div className="flex-1 p-4 space-y-3 flex flex-col relative">
      <div className="w-full flex justify-end px-4 py-1 border-white/10 border rounded-full gap-4">
        {sortOptions.map(({ icon, type, action }, index) => (
          <button
            key={index}
            className="text-2xl"
            onClick={() =>
              setData({
                files: data && sortData([...data.files], type, action),
                folders: data && sortData([...data.folders], type, action),
              })
            }
          >
            {icon}
          </button>
        ))}
      </div>
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
