"use client"
import { FolderType } from "@/types/FileSystem"
import { useRef, useEffect, useState } from "react"
import { FaEyeSlash, FaRegEye } from "react-icons/fa"
import { toast } from "react-toastify"

const PassFolder = ({ data, onSuccess, onClose }: { data: FolderType, onSuccess: () => void, onClose: () => void }) => {
    const [inputType, setInputType] = useState("password")
    const passwordInput = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (passwordInput.current) {
            passwordInput.current.focus()
        }
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    const enterHandler = () => {
        if (passwordInput.current?.value === data.passCode) {
            toast.success("Password correct! Redirecting...")
            onSuccess() // Call success callback to navigate
        } else {
            toast.error("Password was wrong!")
            if (passwordInput.current) {
                passwordInput.current.value = '' // Clear the input
                passwordInput.current.focus() // Refocus for another attempt
            }
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            enterHandler()
        }
    }

    // Prevent click propagation to avoid closing modal when clicking inside
    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50"
            onClick={onClose} // Close when clicking backdrop
        >
            <div
                className="bg-[#111] rounded-lg p-6 max-w-md w-full mx-4 shadow border border-white/20"
                onClick={handleModalClick}
            >
                <h1 className="text-xl font-bold mb-4">Enter the Password</h1>
                <p className="text-gray-300 mb-4">
                    The folder "{data.name}" is locked. Please enter the password to access it.
                </p>
                <div className="w-full px-3 py-2 ring ring-white/20 bg-black rounded-md mb-4 focus:outline-none focus-within:ring-1 in-focus-within:ring-red-950 flex justify-between items-center">
                    <input
                        type={inputType}
                        ref={passwordInput}
                        onKeyPress={handleKeyPress}
                        className="outline-none w-full transition-all"
                        placeholder="Enter password"
                    />
                    <i onClick={() => setInputType(inputType === "password" ? "text" : "password")}>{inputType === "password" ? <FaRegEye /> : <FaEyeSlash />}</i>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={enterHandler}
                        className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md transition"
                    >
                        Submit
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-red-700 hover:bg-red-800 rounded-md transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PassFolder