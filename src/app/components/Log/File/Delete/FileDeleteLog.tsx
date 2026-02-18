import { formatBytes } from "@/app/lib/formatBytes"
import { ActivityLog } from "@/generated/prisma"
import { FaDownload, FaTag, FaUser } from "react-icons/fa"
import { FaFileCirclePlus } from "react-icons/fa6"
import { GiOpenFolder } from "react-icons/gi"
import { MdAlternateEmail } from "react-icons/md"

const FileDeleteLog = ({ data }: { data: ActivityLog }) => {
    return (
        <li className="w-full bg-red-700/20 p-4 rounded-md shadow border border-red-500 gap-1 flex flex-col hover:border-red-600 hover:bg-red-700/40">
            <h1 className="flex items-center gap-1 text-red-600 font-bold">
                <span className="text-xl"><FaFileCirclePlus /></span>
                <span>File Delete!</span>
            </h1>
            <h4 className="flex items-center gap-1">
                <span><FaUser /></span>
                <span>Done By : <b>{data?.metadata?.doneBy}</b></span>
            </h4>
            <h5 className="flex items-center gap-1">
                <span><FaTag /></span>
                <span>Folder: {data?.metadata?.fileName}</span>
            </h5>
            <h5 className="flex items-center gap-1">
                <span><GiOpenFolder /></span>
                <span>Folder: {data?.metadata?.parentFolderName}</span>
            </h5>
            <h5 className="flex items-center gap-1">
                <span><MdAlternateEmail /></span>
                <span>Folder Id: {data?.entityId}</span>
            </h5>
            <h5 className="flex items-center gap-1">
                <span><FaDownload /></span>
                <span>File Size: {formatBytes(data?.metadata?.size)}</span>
            </h5>
            <p className="text-white/40 text-sm">Date {new Date(data.createdAt).toLocaleString()}</p>
        </li>)
}

export default FileDeleteLog