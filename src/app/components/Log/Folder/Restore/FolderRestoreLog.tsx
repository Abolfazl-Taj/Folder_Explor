import { ActivityLog } from "@/generated/prisma"
import { FaDownload, FaTag, FaUser } from "react-icons/fa"
import { FaFileCirclePlus } from "react-icons/fa6"
import { GiOpenFolder } from "react-icons/gi"
import { MdAlternateEmail } from "react-icons/md"

const FolderRestoreLog = ({ data }: { data: ActivityLog }) => {
    return (
        <li className="w-full bg-blue-700/20 p-4 rounded-md shadow border border-blue-500 gap-1 flex flex-col hover:border-blue-600 hover:bg-blue-700/40">
            <h1 className="flex items-center gap-1 text-blue-600 font-bold">
                <span className="text-xl"><FaFileCirclePlus /></span>
                <span>Folder Restored!</span>
            </h1>
            <h4 className="flex items-center gap-1">
                <span><FaUser /></span>
                <span>Done By : <b>{data?.metadata?.doneBy}</b></span>
            </h4>
            <h5 className="flex items-center gap-1">
                <span><FaTag /></span>
                <span>Folder Name: {data?.metadata?.itemName}</span>
            </h5>
            <h5 className="flex items-center gap-1">
                <span><GiOpenFolder /></span>
                <span>Parent Folder: {data?.metadata?.parentName}</span>
            </h5>
            <h5 className="flex items-center gap-1">
                <span><MdAlternateEmail /></span>
                <span>Folder Id: {data?.entityId}</span>
            </h5>
            <p className="text-white/40 text-sm">Date {new Date(data.createdAt).toLocaleString()}</p>
        </li>
    )
}

export default FolderRestoreLog