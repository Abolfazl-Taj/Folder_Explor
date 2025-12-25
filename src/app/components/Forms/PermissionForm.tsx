"use client"
import { getRequest, postRequest } from '@/app/lib/fetchRequest'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IoIosGitMerge } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'
import RadioBtn from '../RadioBtn'

const PermissionForm = ({ folderId, permissions: authorizedBy }: { folderId: string, permissions: any }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedUser, setSelectedUser] = useState<any>()
    const [error, seterror] = useState<any>()
    const [permissions, setPermissions] = useState({
        view: false,
        update: false,
        create: false,
        delete: false,
    })

    const FindUserHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        const { value } = e.target
        setIsLoading(true)
        if (value) {
            setTimeout(async () => {
                try {
                    const { data } = await getRequest({ url: `/api/user/${value}` })
                    setSelectedUser(data)
                    setPermissions(() => {
                        const selectedUser = authorizedBy.find((u) => u.userId === data.id)
                        if (selectedUser) {
                            return {
                                view: selectedUser.canView,
                                update: selectedUser.canUpdate,
                                delete: selectedUser.canDelete,
                                create: selectedUser.canCreate
                            }
                        }
                    })
                    setIsLoading(false)
                } catch (err) {
                    setSelectedUser("")
                    setIsLoading(false)
                    seterror(err.response.data.message);
                }
            }, 500)
        }
    }

    const setPermissionHandler = () => {

        postRequest({
            url: '/api/permission', body: {
                userId: selectedUser.id,
                folderId,
                view: permissions.view,
                update: permissions.update,
                delete: permissions.delete,
                create: permissions.create
            }
        })
    }
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-[100]">
                    <div className="w-[90%] md:w-[500px] bg-[#111] border border-white/10 rounded-2xl shadow-lg shadow-black/40 p-6 flex flex-col gap-6 relative">

                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/10 transition"
                        >
                            <IoClose size={20} className="text-white/70 hover:text-red-500" />
                        </button>

                        <h1 className="font-semibold text-2xl text-white text-center">
                            Modify Folder Permissions
                        </h1>

                        <div className="flex flex-col gap-4 p-2">
                            <div className="relative w-full my-4">
                                {/* The input */}
                                <input
                                    id="userId"
                                    type="text"
                                    placeholder=" "   // placeholder is just a space!
                                    className="
      peer w-full px-4 p-2
      rounded-lg bg-[#111]/10 text-white 
      placeholder-transparent
      border border-white/20 
      focus:border-red-600 focus:ring-2 focus:ring-red-900 
      outline-none transition
    "
                                    onBlur={FindUserHandler}
                                />

                                {/* The floating label */}
                                <label
                                    htmlFor="userId"
                                    className="
      absolute left-3 top-[-16px] bg-[#111]
      text-white/40 text-sm transition-all
      peer-placeholder-shown:top-2
      peer-placeholder-shown:left-4
      peer-placeholder-shown:text-base
      peer-placeholder-shown:text-white/40
      peer-focus:top-[-10px]
      peer-focus:left-0
      peer-focus:text-sm
      peer-focus:text-red-400
    "
                                >
                                    User ID
                                </label>
                            </div>

                            <div className='flex justify-center items-center'>
                                {isLoading ? <button className='w-5 h-5 rounded-full border border-b-gray-300/40 border-l-gray-300 border-r-gray-300/40  border-t-gray-300/40 animate-spin'></button>
                                    : selectedUser ? (
                                        <div className='flex flex-col justify-center items-center gap-4 w-full'>
                                            <div className=' transition-all flex items-center gap-2 px-4 py-1 border border-[#000]/80 shadow hover:bg-[#000]/50 w-full rounded-md'>
                                                <Image unoptimized={true} className=' border border-white/40 rounded-full w-15 h-15' src={selectedUser?.img || "/guestAvi.png"} alt='Selected-user-img' width={100} height={100} />
                                                <h1 className='text-justify font-bold text-lg'>{selectedUser?.userName || selectedUser.email}</h1>
                                            </div>
                                            <div className='w-full border p-4 rounded-md border-red-900 shadow flex flex-col gap-4'>
                                                <h1 className='text-center font-bold border-b border-[#000] py-1'>Permission Settings</h1>
                                                <div className='flex flex-wrap gap-4 justify-center items-center'>
                                                    <RadioBtn labelName='View' name={"view"} value={permissions.view} setValue={setPermissions} />
                                                    <RadioBtn labelName='Create' name={"create"} value={permissions.create} setValue={setPermissions} />
                                                    <RadioBtn labelName='Delete' name={"delete"} value={permissions.delete} setValue={setPermissions} />
                                                    <RadioBtn labelName='Update' name={"update"} value={permissions.update} setValue={setPermissions} />
                                                </div>
                                            </div>
                                        </div>
                                    ) : <span className=" text-white px-4 py-2 rounded-md shadow-md border border-red-600 text-sm font-medium">{error}</span>}
                            </div>
                        </div>
                        <button
                            onClick={setPermissionHandler}
                            className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded-lg transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            )}

            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 bg-[#111]/50 hover:bg-[#111]/70 border border-white/20 text-white font-semibold px-4 py-2 rounded-lg  hover:border-white/20 hover:shadow-lg  transition group"
            >
                <IoIosGitMerge className="text-red-800 text-xl group-hover:text-red-500 transition" />
                Modify Permissions
            </button>
        </>
    )
}

export default PermissionForm
