import { ActivityLog } from "@/generated/prisma"
import { FaMinus, FaQuestion, FaUser } from "react-icons/fa"
import { FaFileCirclePlus } from "react-icons/fa6"
import { MdAlternateEmail } from "react-icons/md"
import { TiPlus } from "react-icons/ti"

const FileUpdateLog = ({ data }: { data: ActivityLog }) => {
    const { typeOfChange } = data.metadata
    return (
        <li className="w-full bg-orange-700/20 p-4 rounded-md shadow border border-orange-500 gap-[3px] flex flex-col hover:border-orange-600 hover:bg-orange-700/40">
            <h1 className="flex items-center gap-1 text-orange-600 font-bold">
                <span className="text-xl"><FaFileCirclePlus /></span>
                <span>File Updated!</span>
            </h1>
            <h4 className="flex items-center gap-1">
                <span><FaUser /></span>
                <span>Done By : <b>{data?.metadata?.doneBy}</b></span>
            </h4>
            {typeOfChange?.name && (<>
                <h5 className="flex items-center gap-1">
                    <span className="text-red-500"><FaMinus /></span>
                    <span>Prev Name: {data?.metadata?.fileName}</span>
                </h5>
                <h5 className="flex items-center gap-1">
                    <span className="text-green-500"><TiPlus /></span>
                    <span>New Name: {data?.metadata?.newFileName}</span>
                </h5>
            </>)}
            {typeOfChange?.size && (<>
                <h5 className="flex items-center gap-1">
                    <span className="text-red-500"><FaMinus /></span>
                    <span>Prev Name: {data?.metadata?.size}</span>
                </h5>
                <h5 className="flex items-center gap-1">
                    <span className="text-green-500"><TiPlus /></span>
                    <span>New Name: {data?.metadata?.newSize}</span>
                </h5>
            </>)}
            <h5 className="flex items-center gap-1">
                <span className="text-orange-500"><FaQuestion /></span>
                <span>Content Changed ?: {typeOfChange?.content ? "Yes" : "No"} </span>
            </h5>

            <h5 className="flex items-center gap-1">
                <span><MdAlternateEmail /></span>
                <span>Folder Id: {data?.entityId}</span>
            </h5>
            <p className="text-white/40 text-sm">Date {new Date(data.createdAt).toLocaleString()}</p>
        </li>
    )
}

export default FileUpdateLog