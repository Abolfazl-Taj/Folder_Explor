"use client"
import { motion } from "motion/react";
import { useState } from "react";
import { IoTrashBin, IoFolderOpen, IoDocumentText } from "react-icons/io5";
import Modal from "./Modal";

const ViewUserComponent = ({ users }: { users: any[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    return (
        <div className="flex flex-col w-full gap-3 px-4 py-6">
            {users?.map((u, i) => (
                <motion.div
                    key={u.id}
                    className="group relative flex items-center gap-4 rounded-xl border border-zinc-900 bg-[#111]/40 px-4 py-3.5 
                     transition-all duration-300 hover:border-red-900/60 hover:bg-zinc-900/90 hover:shadow-[0_0_20px_-5px_rgba(127,29,29,0.4)]"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                >
                    {/* Index */}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-950/60 text-sm font-medium text-red-400 border border-red-900/40">
                        {i + 1}
                    </span>

                    {/* Avatar */}
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-zinc-800 group-hover:ring-red-900/50 transition-all">
                        {u.img ? (
                            <img
                                src={u.img}
                                alt={u.email || "User"}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-zinc-500 text-sm font-medium">
                                {(u.email?.[0] || "?").toUpperCase()}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-zinc-100">
                            {u.email || u.gmail || "No email"}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-zinc-500">
                            ID: <span className="font-mono text-zinc-400">{u.id}</span>
                        </p>

                        {/* Folder + File counts */}
                        <div className="mt-1.5 flex items-center gap-3 text-xs text-zinc-400">
                            <span className="flex items-center gap-1">
                                <IoFolderOpen className="text-amber-500/80" />
                                <span className="font-medium text-zinc-300">{u._count?.folders ?? 0}</span>
                                <span className="text-zinc-500">folders</span>
                            </span>

                            <span className="flex items-center gap-1">
                                <IoDocumentText className="text-sky-500/80" />
                                <span className="font-medium text-zinc-300">{u._count?.files ?? 0}</span>
                                <span className="text-zinc-500">files</span>
                            </span>
                        </div>
                    </div>

                    {/* Accent line */}
                    <div className="absolute left-0 top-1/2 h-8 w-0.5 -translate-y-1/2 rounded-full bg-red-900 opacity-0 transition-opacity group-hover:opacity-100"  />

                    <button
                        className="flex justify-center items-center text-xl text-white transition-all hover:text-red-800 cursor-pointer"
                        onClick={() => {
                            setSelectedUser(u);
                            setIsOpen(true);
                        }}
                    >
                        <IoTrashBin />
                    </button>
                </motion.div>
            ))}

            <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                data={selectedUser}
            />
        </div>
    );
};

export default ViewUserComponent;