"use client"
import { inputType } from "@/types/Input"
import { useField } from "formik"
import { useId, useState } from "react"
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import PasswordStrengthBar from "react-password-strength-bar";

const Input = ({ labelName, type, placeHolder, name, inputClass, labelClass, icon, strengthBar = false }: inputType) => {
    const id = useId()
    const [field, meta] = useField(name!)
    const [inputType, setInputType] = useState("password")
    switch (type) {
        case "text":
            return <div className="flex flex-col gap-2">
                <label className={`${labelClass}`} htmlFor={id}>{labelName}</label>
                <div className="flex items-center gap-1 ring-1 ring-zinc-500 px-2 rounded-md focus-within:ring-blue-500 w-full">
                    <i className="border-r pr-1 border-zinc-600"> {icon}  </i>
                    <input {...field} id={id} className={`${inputClass} pl-2 py-1 flex-1 outline-0 `} type={"text"} placeholder={placeHolder} name={name} />
                </div>
                {meta.touched && meta.error && (
                    <p className="text-sm text-red-900  font-bold">{meta.error}</p>
                )}
            </div>
        case "password":
            return <div className="flex flex-col gap-2">
                <label className={`${labelClass}`} htmlFor={id}>{labelName}</label>
                <div className="flex items-center gap-1 ring-1 ring-zinc-500 px-2 rounded-md focus-within:ring-blue-500 w-full">
                    <i className="border-r pr-1 border-zinc-600"> {icon}  </i>
                    <input {...field} id={id} className={`${inputClass} pl-2 py-1 flex-1 outline-0 `} type={inputType} placeholder={placeHolder} name={name} />
                    <i onClick={() => setInputType(inputType === "text" ? "password" : "text")}>{inputType === "text" ? <FaRegEye /> : <FaEyeSlash />}  </i>
                </div>
                {strengthBar && <PasswordStrengthBar
                    password={field.value}
                    scoreWords={[
                        meta.error ? meta.error : "Very Weak", // Score 0
                        "Too Weak",                            // Score 1
                        "Decent!",                             // Score 2
                        "Getting Better",                      // Score 3
                        "Awesome!"                             // Score 4
                    ]}
                    shortScoreWord="Too short"
                    className="mt-2"
                />}
                {meta.touched && meta.error && (
                    <p className="text-sm text-red-900  font-bold">{meta.error}</p>
                )}
            </div>
        case "confirmPassword":
            return <div className="flex flex-col gap-2">
                <label className={`${labelClass}`} htmlFor={id}>{labelName}</label>
                <div className="flex items-center gap-1 ring-1 ring-zinc-500 px-2 rounded-md focus-within:ring-blue-500 w-full">
                    <i className="border-r pr-1 border-zinc-600"> {icon}  </i>
                    <input {...field} id={id} className={`${inputClass} pl-2 py-1 flex-1 outline-0 `} type={inputType} placeholder={placeHolder} name={name} />
                    <i onClick={() => setInputType(inputType === "text" ? "password" : "text")}>{inputType === "text" ? <FaRegEye /> : <FaEyeSlash />}  </i>
                </div>
                {meta.touched && meta.error && (
                    <p className="text-sm text-red-900  font-bold">{meta.error}</p>
                )}
            </div>
    }
}

export default Input