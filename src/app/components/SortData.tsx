import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import { LuCalendarMinus, LuCalendarPlus } from "react-icons/lu";
import sortData from "@/app/lib/sortData";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import useExpo from "@/hooks/useFileSystem";
import { usePathname } from "next/navigation";

const sortOptions = [
    { icon: <FaSortAlphaDown />, type: "sort", action: "name" },
    { icon: <FaSortAlphaDownAlt />, type: "reverse", action: "name" },
    { icon: <LuCalendarPlus />, type: "sort", action: "date" },
    { icon: <LuCalendarMinus />, type: "reverse", action: "date" },
] as const;



const SortData = ({ sortMethod, setSortMethod }: { sortMethod: any, setSortMethod: any }) => {
    const { user } = useUser();
    const pathName = usePathname()
    const { setFolders, setFiles, safeData } = useExpo()

    const searchInputHandler = (e: any) => {
        const value = e.target?.value
        setFolders(safeData?.folders?.filter(f => f.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())))
        setFiles(safeData?.files?.filter(f => f.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())))
    }
    return (
        <div className="w-full flex items-center justify-between px-6 py-1 border border-white/10 rounded-full  backdrop-blur">
            <Link href={"/settings"}>
                <Image
                    unoptimized={true}
                    src={user?.img || "https://ui-avatars.com/api/?name=user&background=111&color=fff"}
                    alt={user?.userName || "User"}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full border border-red-950 object-cover"
                />
            </Link>
            <label htmlFor="#searchInput" className={` ${pathName === "/bin" ? "hidden" : ""} rounded-full ring-2 transition-all ring-white/30 w-1/2  px-4 py-2 shadow group flex items-center gap-4 focus-within:ring-red-900`}>
                <BsSearch className="text-2xl text-white/40 group-focus-within:text-red-800 transition-all" />
                <input id="searchInput" type="text" className="w-full outline-none " onChange={searchInputHandler} />
            </label>
            <div className="flex items-center gap-2 sm:gap-4">
                {sortOptions.map(({ icon, type, action }, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setSortMethod({
                                type,
                                field: action
                            })
                        }}

                        className={`
                        ${type === sortMethod.type && sortMethod.field === action ? "bg-red-950 scale-110" : ""}
                            
                            text-xl sm:text-2xl text-white/80 hover:text-white transition-all p-1 rounded-full hover:bg-white/10`}
                        title={`${type === "reverse" ? "Reverse by" : "Sort by"} ${action}`}
                    >
                        {icon}
                    </button>
                ))}

            </div>
        </div>
    );
};

export default SortData;
