import { FileType } from "@/types/Expo"
import ModalForm from "./ModalForm";
import Link from "next/link";
import icons from "../lib/Icons";
import { formatBytes } from "../lib/formatBytes";

const Files = ({ data, queryKey, bin }: { data: FileType[], queryKey: any, bin: boolean }) => {

    if (!data || data.length <= 0) return
    return (
        <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl">Files:</h1>
            {data.map((file: FileType) => {
                const iconExist = file.name.includes(".")
                    ? "." + file.name.split(".").pop()?.toLowerCase()
                    : "default";

                return <div key={file.id} className="flex justify-between items-center gap-4 group bg-transparent rounded-lg py-2 px-4 border-b border-gray-300/20 shadow shadow-[#000]/30  hover:bg-[#222]">
                    <Link href={!bin ? `/dashboard/file/${file.id}` : ""}  className="flex-1">
                        <div
                            className="flex-1">
                            <div title={file.name}
                                className="flex-1 flex justify-between">
                                <h4 className="flex items-center gap-2 font-bold w-[200px]">
                                    <span className="text-xl group-hover:text-red-600 text-red-800 transition-all "> {icons[iconExist]}</span>
                                    {file.name}
                                    <div></div>
                                </h4>
                                <h5 className="text-sm font-semibold self-center flex-1 flex justify-center">{formatBytes(file.size, 2)}</h5>
                                <div>
                                    <span className="text-xs text-gray-400 w-fit">
                                        {new Date(file.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <ModalForm type="delete" form="file" data={file} />
                </div>

            })}
        </div >
    )
}

export default Files