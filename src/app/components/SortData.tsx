import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import { LuCalendarMinus, LuCalendarPlus } from "react-icons/lu";
import sortData from "@/app/lib/sortData";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";

const sortOptions = [
    { icon: <FaSortAlphaDown />, type: "sort", action: "name" },
    { icon: <FaSortAlphaDownAlt />, type: "reverse", action: "name" },
    { icon: <LuCalendarPlus />, type: "sort", action: "date" },
    { icon: <LuCalendarMinus />, type: "reverse", action: "date" },
] as const;

type SortType = typeof sortOptions[number]["type"];
type SortAction = typeof sortOptions[number]["action"];

interface SortDataProps {
    data: {
        files: any[];
        folders: any[];
    };
    setData: (data: { files: any[]; folders: any[] }) => void;
}

const SortData = ({ data, setData }: SortDataProps) => {
    const { user } = useUser();

    const handleSort = (type: SortType, action: SortAction) => {
        setData({
            files: sortData([...data.files], type, action),
            folders: sortData([...data.folders], type, action),
        });
    };

    return (
        <div className="w-full flex items-center justify-between px-6 py-1 border border-white/10 rounded-full  backdrop-blur">
            <Link href={"/settings"}>
                <Image
                    unoptimized
                    src={user?.img || "https://ui-avatars.com/api/?name=user&background=111&color=fff"}
                    alt={user?.userName || "User"}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full border border-red-950 object-cover"
                />
            </Link>

            <div className="flex items-center gap-2 sm:gap-4">
                {sortOptions.map(({ icon, type, action }, index) => (
                    <button
                        key={index}
                        onClick={() => handleSort(type, action)}
                        className="text-xl sm:text-2xl text-white/80 hover:text-white transition p-1 rounded-full hover:bg-white/10"
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
