import { inputType } from "@/types/Input"
import { useField } from "formik"
import { useId } from "react"

const Input = ({ labelName, type, placeHolder, name, inputClass, labelClass, icon }: inputType) => {
    const id = useId()
    const [field, meta] = useField(name!)
    return (
        <div className="flex flex-col gap-2">
            <label className={`${labelClass}`} htmlFor={id}>{labelName}</label>
            <div className="flex items-center gap-1 ring-1 ring-zinc-500 px-2 rounded-md focus-within:ring-blue-500 w-full">
                <i className="border-r pr-1 border-zinc-600"> {icon}  </i>
                <input {...field} id={id} className={`${inputClass} pl-2 py-1 flex-1 outline-0 `} type={type} placeholder={placeHolder} name={name} />
            </div>
                {meta.touched && meta.error && (
                    <p className="text-sm text-red-900 mb-1 font-bold">{meta.error}</p>
                )}
        </div>
    )
}

export default Input