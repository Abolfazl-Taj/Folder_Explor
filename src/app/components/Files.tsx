import { FileType } from "@/types/Expo"
import { FaFileLines, FaJava, FaMarkdown, FaPython, FaRust } from "react-icons/fa6";
import { FaHtml5, FaReact, FaCss3, FaPhp, FaFilePdf } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { SiC, SiCplusplus, SiDart, SiDocker, SiGnubash, SiGo, SiHellyhansen, SiJson, SiKotlin, SiLua, SiMongodb, SiMysql, SiRuby, SiSwift, SiTypescript, SiYaml } from "react-icons/si";
import ModalForm from "./ModalForm";
import { PiFileCSharpBold } from "react-icons/pi";
import { IoLogoVue } from "react-icons/io5";
import Link from "next/link";

const Files = ({ data, queryKey }: { data: FileType[], queryKey: any }) => {
    const icons: { [key: string]: any } = {
        // Web
        ".html": <FaHtml5 />,
        ".css": <FaCss3 />,
        ".js": <IoLogoJavascript />,
        ".ts": <SiTypescript />,
        ".jsx": <FaReact />,
        ".tsx": <FaReact />,
        ".vue": <IoLogoVue />,
        ".json": <SiJson />,
        ".yaml": <SiYaml />,
        ".yml": <SiYaml />,
        ".md": <FaMarkdown />,

        //Document
        ".pdf": <FaFilePdf />,
        // Backend / Systems
        ".php": <FaPhp />,
        ".py": <FaPython />,
        ".java": <FaJava />,
        ".c": <SiC />,
        ".cpp": <SiCplusplus />,
        ".cs": <PiFileCSharpBold />,
        ".go": <SiGo />,
        ".rs": <FaRust />,
        ".rb": <SiRuby />,
        ".kt": <SiKotlin />,
        ".swift": <SiSwift />,
        ".dart": <SiDart />,
        ".lua": <SiLua />,
        ".sh": <SiGnubash />,
        ".ps1": <SiHellyhansen />,
        ".dockerfile": <SiDocker />,

        // Database
        ".sql": <SiMysql />,
        ".db": <SiMongodb />,

        // Default fallback
        "default": <FaFileLines />
    }

    if (!data || data.length <= 0) return
    return (
        <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl">Files:</h1>
            {data.map((file: FileType) => {
                const iconExist = file.name.includes(".")
                    ? "." + file.name.split(".").pop()?.toLowerCase()
                    : "default";

                return <div key={file.id} className="flex justify-between items-center gap-4 group bg-transparent rounded-lg py-2 px-4 border-b border-gray-300/20 shadow shadow-[#000]/30  hover:bg-[#222]">
                    <Link href={`/dashboard/file/${file.id}`} className="flex-1">
                        <div
                            className="flex justify-between items-center">
                            <div title={file.name}
                                className="flex-1 flex items-center justify-between">
                                <h4 className="flex items-center gap-2 font-bold">
                                    <span className="text-xl group-hover:text-red-600 text-red-800 transition-all "> {icons[iconExist]}</span>
                                    {file.name}
                                    <div></div>
                                </h4>
                                <div>
                                    <span className="text-xs text-gray-400">
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