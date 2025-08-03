"use client"
import Loading from "@/app/components/Loading"
import { getRequest } from "@/app/lib/fetchRequest"
import { formatBytes } from "@/app/lib/formatBytes"
import { FileType } from "@/types/Expo"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useMemo } from "react"
import { GrStorage } from "react-icons/gr"

const UsagePage = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["allFiles"],
        queryFn: () => getRequest({ url: "/api/file" }).then(res => {
            return res.files
        })
    })
    if (isError) return <h1>{error.message}</h1>
    const totalSize = useMemo(() => {
        return data?.reduce(
            (acc: number, file: FileType) => acc + (file.size || 0),
            0
        );
    }, [data])
    const readableSize = useMemo(() => {
        return formatBytes(totalSize)
    }, [totalSize])
    const largestFiles = useMemo(() => {
        return [...(data || []).sort((a: FileType, b: FileType) => b.size - a.size).slice(0, 5)]
    }, [data])
    const percenteUsage = ((totalSize / (2 * 1024 * 1024)) * 100).toFixed(2)
    const fileTypePercentages = useMemo(() => {
        if (!data?.length) return []

        const typeCount: Record<string, number> = {}

        data.forEach((f: FileType) => {
            const suffix = f.name?.includes(".")
                ? "." + f.name.split(".").pop()?.toLowerCase()
                : ".txt"
            typeCount[suffix] = (typeCount[suffix] || 0) + 1
        })

        const totalFiles = data.length

        const percentages = Object.entries(typeCount).map(([type, count]) => ({
            type,
            count,
            percentage: ((count / totalFiles) * 100).toFixed(2),
        }))

        return percentages.sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage))
    }, [data])

    const fileColors: Record<string, string> = {
        ".tsx": "#4F46E5",
        ".ts": "#38BDF8",
        ".js": "#FBBF24",
        ".py": "#FFD43B",
        ".txt": "#A3A3A3",
        ".c": "#10B981",
        ".cpp": "#6366F1",
        ".html": "#f68400",
        ".css": "#9500ff",
        ".jsx": "#9f0712",
        ".lua": "#C0C0C0"
    }

    return isLoading ? (
        <Loading />
    ) : (
        <div className="flex-1 flex flex-col gap-2 py-2 ">
            {/* Storage Overview */}
            <div className="bg-[#111]/50 p-5 rounded-xl shadow-lg flex flex-col items-center gap-2 border border-white/10">
                <Image src="/useage.png" alt="usage-pic" width={120} height={120} className="w-auto" />
                <div className="text-center">
                    <h1 className="text-white text-lg font-semibold">Total Storage Used</h1>
                    <p className="text-xl font-bold text-white">{readableSize}</p>
                    <p className="text-sm text-gray-400">{percenteUsage}% of 2GB</p>
                </div>
            </div>

            {/* File Type Breakdown */}
            <div className="bg-[#111]/50 p-6 rounded-xl shadow-lg border border-white/10">
                <h2 className="text-white text-lg font-semibold mb-4">File Type Usage</h2>
                <div className="relative w-full bg-white/10 h-5 rounded-full overflow-hidden flex">
                    {fileTypePercentages?.map(({ type, percentage }) => (
                        <div
                            key={type}
                            style={{
                                width: `${percentage}%`,
                                backgroundColor: fileColors[type] || "#ffffff55",
                            }}
                            className="h-full transition-all flex justify-center items-center duration-300"
                            title={`${type}: ${percentage}%`}
                        > <span className="text-xs font-semibold">{percentage}%</span> </div>
                    ))}
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-white/70">
                    {fileTypePercentages?.map(({ type }) => (
                        <div key={type} className="flex items-center gap-1">
                            <div
                                className="w-3 h-3 rounded-sm"
                                style={{ backgroundColor: fileColors[type] || "#ffffff55" }}
                            />
                            <span>{type}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Largest Files */}
            <div className="bg-[#111]/50 p-6 rounded-xl shadow-lg border border-white/10 space-y-1">
                <h2 className="text-white text-lg font-semibold">Top 5 Largest Files</h2>
                <div className="flex flex-wrap justify-around gap-4">
                    {largestFiles.map((file, index) => (
                        <div
                            key={file.id}
                            className="flex flex-1/3 gap-4 items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-red-900/30 transition-colors"
                        >
                            <div className="flex items-center gap-3 flex-1">
                                <span className="bg-red-900/50 text-white px-3 py-1 rounded-lg font-bold">
                                    #{index + 1}
                                </span>
                                <span className="font-medium truncate">{file.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <GrStorage className="text-red-500" />
                                {formatBytes(file.size)}
                            </div>
                            <span className="text-xs text-gray-500">
                                {new Date(file.updatedAt).toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default UsagePage