"use client "

import { postRequest } from "@/app/lib/fetchRequest"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BsRecycle } from "react-icons/bs"
import { IoWarning } from "react-icons/io5"
import { toast } from "react-toastify"

const RestoreForm = ({ name, id, entityType }: { name: string, id: string, entityType: "file" | "folder" }) => {
    const navigation = useRouter()
    const [openModal, setOpenModal] = useState(false)
    const queryClient = useQueryClient()
    const restoreHandler = async () => {
        try {
            await postRequest({ url: '/api/restore', body: { id, entityType } })
            setOpenModal(false)
            queryClient.invalidateQueries()
            navigation.push("/bin")
            toast.success("Item restored sucessfully !")
        } catch (error) {
            console.log(error);
            navigation.push("/bin")

            toast.error(error?.message)
        }
    }
    if (!openModal) {
        return <button className="text-2xl text-blue-500" onClick={() => setOpenModal(true)}><BsRecycle /></button>
    }
    return (
        <div className="fixed left-0 top-0 w-full h-full bg-black/20 backdrop-blur-lg flex justify-center items-center flex-col gap-4">
            <div className="flex justify-center items-center flex-col gap-4 shadow bg-red-950/50 border border-white/20 h-1/2 px-4 py-6 rounded-md w-1/3">
                <h1 className="font-black text-2xl flex items-center gap-2 text-orange-700">Warning <IoWarning className="text-2xl" /> </h1>
                <p className="text-md text-[#ddd] font-bold ">Do you want to restore   <span className="text-red-800">{name}</span> ?</p>
                <div className="flex gap-4 w-full justify-center items-center my-2">
                    <button className="text-xl px-6 py-2 rounded-md bg-green-500 hover:bg-green-800 transition-all" onClick={restoreHandler}>Yes</button>

                    <button className="text-xl px-6 py-2 rounded-md bg-red-500 hover:bg-red-800 transition-all" onClick={() => setOpenModal(false)}>No</button>
                </div>
            </div>

        </div>
    )
}

export default RestoreForm