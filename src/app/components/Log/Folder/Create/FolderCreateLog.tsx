import { ActivityLog } from "@/generated/prisma"
import { FaFolderPlus, FaUser } from "react-icons/fa";
import { GiOpenFolder } from "react-icons/gi";
import { MdAlternateEmail } from "react-icons/md";

const FolderCreateLog = ({ data }: { data: ActivityLog }) => {

    return (
        <li className="w-full flex flex-col gap-1 bg-green-400/20 p-4 border border-green-400 rounded-md shadow-md hover:bg-green-400/50 hover:border-green-200 transition-all">
            <h1 className="flex items-center gap-1 text-green-400 font-bold">
                <span className="text-xl">
                    <FaFolderPlus />
                </span>
                <span>Folder Created!</span>
            </h1>
            <h4 className="flex items-center gap-1">
                <span><FaUser /></span>
                <span>Done By : <b>{data?.metadata?.doneBy}</b></span>
            </h4>
            <h5 className="flex items-center gap-1">
                <span><GiOpenFolder /></span>
                <span>Folder Name: {data?.metadata?.folderName}</span>
            </h5>
            <h5 className="flex items-center gap-1">
                <span><MdAlternateEmail /></span>
                <span>Folder Id: {data?.entityId}</span>
            </h5>
            <p className="text-white/40 text-sm">Date {new Date(data.createdAt).toLocaleString()}</p>
        </li>
    )
}

export default FolderCreateLog