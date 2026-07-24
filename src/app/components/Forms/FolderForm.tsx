"use client"
import { deleteRequest, patchRequest, postRequest } from '@/app/lib/fetchRequest';
import CreateFolderScheme from '@/app/lib/schemas/FolderCreate';
import { Modal } from '@/types/Modal';
import { useQueryClient } from '@tanstack/react-query';
import React, { ReactNode, useRef, useState } from 'react'
import { BsPencilSquare } from 'react-icons/bs';
import { FaLockOpen, FaPlus } from 'react-icons/fa';
import { FaFolderClosed, FaTrashCan } from 'react-icons/fa6';
import FormikForm from '../FormikForm';
import { IoCloseSharp } from 'react-icons/io5';
import Input from '../Input';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { LuLock } from 'react-icons/lu';

const FolderForm = ({ type, data, folderId }: Modal) => {
    const nameInput = useRef<HTMLInputElement>(null);
    const PrevPasswordInput = useRef<HTMLInputElement>(null);
    const NewPasswordInput = useRef<HTMLInputElement>(null);
    const [isopen, setIsopen] = useState(false)
    const router = useRouter()
    const path = folderId ? `/dashboard/${folderId}` : "/dashboard"

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
            toast.success("Folder created sucessfully!")
            setIsopen(false)
            router.push(path)
        }).catch(err => {
            toast.error(err.message)
            router.push(path)
        })
    }
    const deleteFolder = () => {
        deleteRequest(`/api/folder/${data.id}`).then(() => {
            queryClient.invalidateQueries()
            setIsopen(false)
            router.push("/dashboard")
        }).then(() => {
            queryClient.invalidateQueries()
            toast.success("Folder deleted sucessfully!")
            setIsopen(false)
            router.push(path)
        }).catch(err => {
            toast.error(err.message)
            router.push(path)
        })
    }
    const PatchFolder = () => {
        if (nameInput.current) {
            patchRequest("/api/folder", {
                name: nameInput.current.value,
                id: data.id
            }).then(() => {
                queryClient.invalidateQueries()
                toast.success("Folder updated sucessfully!")
                router.push(path)
            }).catch(err => {
                toast.error(err.message)
                router.push(path)
            })
        }
    }
    const LockFolderHandler = () => {
        if (nameInput.current) {
            patchRequest("/api/folder", {
                id: data.id,
                locked: true,
                passCode: nameInput.current.value
            }).then(() => {
                queryClient.invalidateQueries()
                toast.success("Folder updated sucessfully!")
                router.push(path)
                setIsopen(false)
            }).catch(err => {
                toast.error(err.message)
                router.push(path)
            })
        }
    }
    const changePasswordHandler = () => {
        if (PrevPasswordInput.current && NewPasswordInput.current) {
            patchRequest("/api/folder", {
                id: data.id,
                currentPassCode: PrevPasswordInput.current.value,
                passCode: NewPasswordInput.current.value
            }).then(() => {
                queryClient.invalidateQueries()
                toast.success("Folder updated sucessfully!")
                router.push(path)
                setIsopen(false)
            }).catch(err => {
                toast.error(err.message)
                router.push(path)
            })
        }
    }
    const FolderButtonUi: { [key: string]: { style: string, icon: ReactNode, title: string, } } = {
        "add": {
            style: "flex flex-1/2 lg:flex-none justify-center bg-[#111]/2 backdrop-blur-2xl border border-white/20 w-fit px-4 py-1 rounded-md shadow-2xl gap-2 items-center  hover:bg-[#111]/40 transition-all",
            icon: <FaFolderClosed className="text-red-900" />,
            title: "Create Folder"
        },
        "delete": {
            style: "flex justify-end text-white hover:text-red-800 transition-all hover:scale-110",
            icon: <FaTrashCan />,
            title: ""
        },
        "update": {
            style: "flex justify-end  text-blue-700 hover:text-blue-800 transition-all hover:scale-110",
            icon: <BsPencilSquare />,
            title: ""
        },
        "lock": {
            style: "text-orange-500",
            icon:  data?.locked ? <LuLock /> : <FaLockOpen/>  ,
            title: ""
        }
        
    }
    if (!isopen) {
        return <button onClick={() => setIsopen(true)} className={`${FolderButtonUi[type]?.style} `}>
            <span className='hidden lg:block'>
            {FolderButtonUi[type]?.title ?? FolderButtonUi[type]?.title}
            </span>
            {FolderButtonUi[type]?.icon ?? FolderButtonUi[type]?.icon}
        </button>
    }
    const FolderFormUi: { [key: string]: { ui: ReactNode } } = {
        "add": {
            ui: (
                <>
                    <h1 className="font-bold text-2xl text-center">Add new folder</h1>
                    <FormikForm
                        className="flex flex-col gap-4"
                        initialState={{ name: "" }} schema={CreateFolderScheme} onSubmit={createFolder}>
                        <Input labelClass="text-xl" name="name" labelName="Folder name" placeHolder="Test123" icon={<FaFolderClosed />} type="text" />
                        <button type='submit' className="bg-[#444]/40 transition-all w-fit px-4 py-1 self-center rounded-md hover:bg-[#444]" >Create folder</button>
                    </FormikForm>
                </>
            )
        },
        "delete": {
            ui: (<>                    <h1 className="font-bold text-2xl text-center">Are you sure ?</h1>
                <p className="text-center text-gray-300 text-sm ">Deleting folder meaning to delete the folder with all the items inside</p>
                <h3 className="text-center">Your trying to delete <span className="font-bold border-b text-red-900">{data?.name}</span> Folder</h3>
                <div className="w-full items-center justify-around flex mt-2">
                    <button className="px-12 py-1 rounded-md shadow border border-white/20 bg-green-700 hover:bg-green-900 transition-all" onClick={deleteFolder} >Yes</button><button onClick={() => setIsopen(false)} className=" transition-all px-12 py-1 rounded-md shadow border border-white/20 bg-red-900 hover:bg-red-950">No</button>
                </div></>)
        },
        "update": {
            ui: (<>                    <h1 className="font-bold text-2xl text-center">Editing folder</h1>
                <h3 className="text-center text-gray-300">Your trying to edit <span className="font-bold border-b text-red-900">{data?.name}</span> Folder</h3>
                <div className="px-4">
                    <input ref={nameInput} type="text" placeholder={`current one : ${data?.name}`} className="w-full py-2 outline-none ring focus-within:ring-blue-500 rounded-md px-4" />
                </div>
                <div className="w-full items-center justify-around flex mt-2">
                    <button className="px-12 py-1 rounded-md shadow border border-white/20 bg-green-700 hover:bg-green-900 transition-all" onClick={PatchFolder} >Save</button><button onClick={() => setIsopen(false)} className=" transition-all px-12 py-1 rounded-md shadow border border-white/20 bg-red-900 hover:bg-red-950">Cancel</button>
                </div></>)
        },
        "lock": {
            ui: (<>                    <h1 className="font-bold text-2xl text-center">Locking Folder</h1>
                <h3 className="text-center text-gray-300">Your trying to Lock <span className="font-bold border-b text-orange-500">{data?.name}</span> Folder</h3>
                {!data?.locked && <p className='text-center text-red-500'>Your Folder currently is not protected</p>}
                {data?.locked && <p className='text-center text-[#fdfdfd]/50 text-sm   self-center'>Your Folder is protected for changing your password we need your prev password</p>}
                <div className="px-4 flex flex-col gap-4">
                    <input ref={!data?.locked ? nameInput : PrevPasswordInput} type="text" placeholder={`${data?.locked ? "Prev Password" : "Ex: A1@B!C#d1"}`} className="w-full py-2 outline-none ring ring-white/20 focus-within:ring-blue-500 rounded-md px-4" />
                    {data?.locked && <input ref={NewPasswordInput} type="text" placeholder={`New Password`} className="w-full py-2 outline-none ring ring-white/20 focus-within:ring-blue-500 rounded-md px-4" />}
                </div>
                <div className="w-full items-center justify-around flex my-2 gap-2 px-4">
                    {!data?.locked && <button className="px-12 py-1 rounded-md shadow border border-white/20 bg-green-700 hover:bg-green-900 transition-all" onClick={LockFolderHandler} >Lock</button>}
                    {data?.locked && <button onClick={changePasswordHandler} className=" transition-all px-12 py-1 rounded-md shadow border border-white/20 bg-blue-900 hover:bg-blue-950">Change Password</button>}                    <button onClick={() => setIsopen(false)} className=" transition-all px-12 py-1 rounded-md shadow border border-white/20 bg-red-900 hover:bg-red-950">Unlock </button>
                </div></>)
        }
    }
    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[18px] border border-white/10 shadow-2xl rounded-xl flex justify-center items-center ">
            <div className="p-4 w-1/3 rounded-xl bg-[#111] backdrop-blur-[14px] border border-white/10 shadow-lg flex flex-col gap-2">
                <i onClick={() => setIsopen(false)} className="absolute top-2 right-4 text-[25px] text-red-900"><IoCloseSharp /></i>
                {FolderFormUi[type].ui}
            </div>
        </div>
    );
}

export default FolderForm