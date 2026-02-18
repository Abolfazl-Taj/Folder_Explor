import { ActivityLog } from "@/generated/prisma"
import { FaUser , FaMinus  } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { MdAlternateEmail } from "react-icons/md";
import { TiPlus } from "react-icons/ti";

const FolderUpdateLog = ({ data }: { data: ActivityLog }) => {
    return (
        <li className="w-full bg-orange-700/20 p-4 rounded-md shadow border border-orange-500 gap-[3px] flex flex-col hover:border-orange-600 hover:bg-orange-700/40">
            <h1 className="flex items-center gap-1 text-orange-600 font-bold">
                <span className="text-xl"><GrUpdate /></span>
                <span>Folder Updated!</span>
            </h1>
            <h4 className="flex items-center gap-1">
                <span><FaUser /></span>
                <span>Done By : <b>{data?.metadata?.doneBy}</b></span>
            </h4>

            <h5 className="flex items-center gap-1">
                <span className="text-red-500"><FaMinus /></span>
                <span>Prev Name: {data?.metadata?.prvName}</span>
            </h5>
            <h5 className="flex items-center gap-1">
                <span className="text-green-500"><TiPlus /></span>
                <span>New Name: {data?.metadata?.newName}</span>
            </h5>
            <h5 className="flex items-center gap-1">
                <span><MdAlternateEmail /></span>
                <span>Folder Id: {data?.entityId}</span>
            </h5>
            <p className="text-white/40 text-sm">Date {new Date(data.createdAt).toLocaleString()}</p>
        </li>)
}

export default FolderUpdateLog