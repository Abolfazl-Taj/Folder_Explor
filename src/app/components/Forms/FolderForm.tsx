import { deleteRequest, patchRequest, postRequest } from '@/app/lib/fetchRequest';
import CreateFolderScheme from '@/app/lib/schemas/FolderCreate';
import { Modal } from '@/types/Modal';
import { useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react'
import { BsPencilSquare } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { FaFolderClosed, FaTrashCan } from 'react-icons/fa6';
import FormikForm from '../FormikForm';
import { IoCloseSharp } from 'react-icons/io5';
import Input from '../Input';
import { useRouter } from 'next/navigation';

const FolderForm = ({ type, data, folderId }: Modal) => {
    const nameInput = useRef<HTMLInputElement>(null);
    const [isopen, setIsopen] = useState(false)
    const router = useRouter()
    const queryClient = useQueryClient()
    const createFolder = (value: any) => {
        const { name } = value
        postRequest({
            url: "/api/folder", body: {
                name,
                parentId: folderId
            }
        }).then(() => {
            queryClient.invalidateQueries()
            setIsopen(false)
            router.push("/dashboard")
        })
    }
    const deleteFolder = () => {
        deleteRequest(`/api/folder/${data.id}`).then(() => {
            queryClient.invalidateQueries()
            setIsopen(false)
            router.push("/dashboard")
        })
    }
    const PatchFolder = () => {
        if (nameInput.current) {
            patchRequest("/api/folder", {
                name: nameInput.current.value,
                id: data.id
            }).then(() => {
                queryClient.invalidateQueries()
                setIsopen(false)
                router.push("/dashboard")
            })
        }
    }
    if (!isopen) {
        switch (type) {
            case "add":
                return <button
                    onClick={() => setIsopen(true)}
                    className="flex bg-[#111]/2 backdrop-blur-2xl border border-white/20 w-fit px-4 py-1 rounded-md shadow-2xl gap-2 items-center  hover:bg-[#111]/40 transition-all">
                    <FaPlus className="text-red-900" />
                    <p>Add Folder</p>
                </button>
            case "delete":
                return <button className="flex justify-end hover:text-red-800 transition-all hover:scale-110" onClick={(e) => {
                    setIsopen(true)
                }}  >
                    <FaTrashCan />
                </button>
            case "update":
                return <button onClick={() => setIsopen(true)} className="text-blue-700/80 hover:text-blue-700 transition-all text-lg hover:scale-110">
                    <BsPencilSquare />
                </button>
        }
    }
    switch (type) {
        case "add":
            return (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[18px] border border-white/10 shadow-2xl rounded-xl flex justify-center items-center ">
                    <div className="p-4 w-1/3 rounded-xl bg-[#111] backdrop-blur-[14px] border border-white/10 shadow-lg flex flex-col gap-2">
                        <i onClick={() => setIsopen(false)} className="absolute top-2 right-4 text-[25px] text-red-900"><IoCloseSharp /></i>
                        <h1 className="font-bold text-2xl text-center">Add new folder</h1>
                        <FormikForm initialState={{ name: "" }} schema={CreateFolderScheme} onSubmit={createFolder}>
                            <Input labelClass="text-xl" name="name" labelName="Folder name" placeHolder="Test123" icon={<FaFolderClosed />} type="text" />
                            <button className="bg-[#444]/40 transition-all w-fit px-4 py-1 self-center rounded-md hover:bg-[#444]" >Create folder</button>
                        </FormikForm>
                    </div>
                </div>
            );
        case "delete":
            return <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[18px] border border-white/10 shadow-2xl rounded-xl flex justify-center items-center ">
                <div className="p-4 w-1/3 rounded-xl bg-[#111] backdrop-blur-[14px] border border-white/10 shadow-lg flex flex-col gap-4">
                    <i onClick={() => setIsopen(false)} className="absolute top-2 right-4 text-[25px] text-red-900"><IoCloseSharp /></i>
                    <h1 className="font-bold text-2xl text-center">Are you sure ?</h1>
                    <p className="text-center text-gray-300 text-sm ">Deleting folder meaning to delete the folder with all the items inside</p>
                    <h3 className="text-center">Your trying to delete <span className="font-bold border-b text-red-900">{data.name}</span> Folder</h3>
                    <div className="w-full items-center justify-around flex mt-2">
                        <button className="px-12 py-1 rounded-md shadow border border-white/20 bg-green-700 hover:bg-green-900 transition-all" onClick={deleteFolder} >Yes</button><button onClick={() => setIsopen(false)} className=" transition-all px-12 py-1 rounded-md shadow border border-white/20 bg-red-900 hover:bg-red-950">No</button>
                    </div>
                </div>
            </div>

        case "update":
            return <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[18px] border border-white/10 shadow-2xl rounded-xl flex justify-center items-center ">
                <div className="p-4 w-1/3 rounded-xl bg-[#111] backdrop-blur-[14px] border border-white/10 shadow-lg flex flex-col gap-4">
                    <i onClick={() => setIsopen(false)} className="absolute top-2 right-4 text-[25px] text-red-900"><IoCloseSharp /></i>
                    <h1 className="font-bold text-2xl text-center">Editing folder</h1>
                    <h3 className="text-center text-gray-300">Your trying to edit <span className="font-bold border-b text-red-900">{data.name}</span> Folder</h3>
                    <div className="px-4">
                        <input ref={nameInput} type="text" placeholder={`current one : ${data.name}`} className="w-full py-2 outline-none ring focus-within:ring-blue-500 rounded-md px-4" />
                    </div>
                    <div className="w-full items-center justify-around flex mt-2">
                        <button className="px-12 py-1 rounded-md shadow border border-white/20 bg-green-700 hover:bg-green-900 transition-all" onClick={PatchFolder} >Save</button><button onClick={() => setIsopen(false)} className=" transition-all px-12 py-1 rounded-md shadow border border-white/20 bg-red-900 hover:bg-red-950">Cancel</button>
                    </div>
                </div>
            </div>
    }
}

export default FolderForm