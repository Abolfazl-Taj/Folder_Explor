"use client"
import { inputType } from "@/types/Input"
import { useField } from "formik"
import Image from "next/image"
import { useId, useState } from "react"
import { FaRegEye, FaEyeSlash } from "react-icons/fa"
import PasswordStrengthBar from "react-password-strength-bar"

const Input = ({
    labelName,
    type,
    placeHolder,
    name,
    inputClass,
    labelClass,
    icon,
    strengthBar = false,
    defaultValue,
    className,
}: inputType) => {
    const id = useId()
    const [field, meta, helpers] = useField(name!)
    const [showPassword, setShowPassword] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const isPasswordType = type === "password" || type === "confirmPassword"
    const currentType = isPasswordType && !showPassword ? "password" : "text"

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0]
        if (file) {
            helpers.setValue(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }
    const renderInputByType = () => {
        switch (type) {
            case "text":
                return (
                    <input
                        {...field}
                        id={id}
                        className={`${inputClass} pl-2 py-1 flex-1 outline-0`}
                        type={type}
                        placeholder={placeHolder}
                    />
                )

            case "password":
            case "confirmPassword":
                return (
                    <>
                        <input
                            {...field}
                            id={id}
                            className={`${inputClass} pl-2 py-1 flex-1 outline-0`}
                            type={currentType}
                            placeholder={placeHolder}
                        />
                        <i
                            onClick={() => setShowPassword(prev => !prev)}
                            className="cursor-pointer"
                        >
                            {showPassword ? <FaRegEye /> : <FaEyeSlash />}
                        </i>
                    </>
                )

            case "file":
                const currentImage = previewUrl
                    ? previewUrl // local preview after user selects a file
                    : typeof field.value === "string"
                        ? field.value // default image from backend (URL string)
                        : "https://ui-avatars.com/api/?name=user&background=#111" // fallback
                return (
                    <div className="w-full flex justify-center">
                        <input
                            id={id}
                            name={name}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <label htmlFor={id} className="cursor-pointer relative w-40 h-40 rounded-full overflow-hidden ring-2 ring-zinc-500 hover:ring-blue-500 transition">
                            <Image
                                width={40}
                                height={40}
                                unoptimized={true}
                                src={currentImage}
                                alt="avatar"
                                className="w-full h-full object-cover"
                            />
                            {/* Optional overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center text-white text-sm">
                                Change
                            </div>
                        </label>
                    </div>
                )


            default:
                return (
                    <input
                        {...field}
                        id={id}
                        className={`${inputClass} pl-2 py-1 flex-1 outline-0`}
                        type="text"
                        placeholder={placeHolder}
                    />
                )
        }
    }

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {labelName && (
                <label className={labelClass} htmlFor={id}>
                    {labelName}
                </label>
            )}
            <div className={`flex items-center gap-1 ${type !== "file" && "ring-1 ring-zinc-500"} px-2 rounded-md focus-within:ring-blue-500 w-full`}>
                {icon && <i className="border-r pr-1 border-zinc-600">{icon}</i>}
                {renderInputByType()}
            </div>

            {strengthBar && type === "password" && (
                <PasswordStrengthBar
                    password={field.value}
                    scoreWords={[
                        meta.error || "Very Weak",
                        "Too Weak",
                        "Decent!",
                        "Getting Better",
                        "Awesome!"
                    ]}
                    shortScoreWord="Too short"
                    className="mt-2"
                />
            )}

            {meta.touched && meta.error && (
                <p className="text-sm text-red-900 font-bold">{meta.error}</p>
            )}
        </div>
    )
}

export default Input
