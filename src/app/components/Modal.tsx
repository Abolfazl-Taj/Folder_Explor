"use client";

import { toast } from "react-toastify";
import prisma from "../lib/prisma";
import { useUser } from "@/hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
const Modal = ({ isOpen, setIsOpen, data }) => {
    if (!isOpen || !data) return null;
    const { id: userId } = useUser().user
    const queryClient = useQueryClient()
    const nav = useRouter()

    const deleteUserHandler = async () => {
        if (data.id === userId) {
            toast.error("You cant delete your own account silly!")
        }
        try {
            const deletedUser = prisma.user.delete({
                where: { id: data.id }
            }).then((res) => {
                toast.success(`User ${data.username || data.email} have been deleted permanently `)
                queryClient.invalidateQueries()
                nav.push('/adminpanel')
            })
            return deletedUser
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Something went wrong contact support")

        }

    }
    return (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#111]/40 to-red-950/20 backdrop-blur-xl flex justify-center items-center">
            <div className="py-6 flex flex-col gap-4 items-center justify-center max-w-md px-6">
                <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full ring-2 ring-zinc-800">
                    {data.img ? (
                        <img
                            src={data.img}
                            alt={data.email || "User"}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-zinc-500 text-sm font-medium">
                            {(data.email?.[0] || "?").toUpperCase()}
                        </div>
                    )}
                </div>

                <h1 className="text-xl font-bold text-center">
                    You're trying to delete user{" "}
                    <b className="font-black text-red-800">{data.email}</b>
                    <br />
                    are you sure about that?
                </h1>

                <p className="font-thin text-white/50 text-center">
                    This action has consequences. Deleting this user means removing{" "}
                    <b className="font-medium">all</b> of their <b className="font-medium">data</b>.
                </p>

                <div className="w-full flex justify-center gap-6 items-center mt-2">
                    <button className="px-4 py-2 font-bold bg-green-700 rounded-md shadow cursor-pointer" onClick={deleteUserHandler}>
                        Continue
                    </button>
                    <button
                        className="px-4 py-2 font-bold bg-red-950 rounded-md shadow cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;