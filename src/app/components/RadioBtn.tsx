"use client"
import { useId } from "react";

interface RadioBtnProps {
    labelName: string;
    setValue: any
    name: string;
    value: boolean;
}

const RadioBtn = ({ labelName, setValue, value, name }: RadioBtnProps) => {
    const id = useId();
    const valueHandler = () => {
        setValue((prev) => {
        console.log(prev); 
            return {
                ...prev,
                [name]: !value
            }
        })
    }
    return (
        <div className="flex items-center gap-2 cursor-pointer shadow px-4 py-2 w-[40%]">
            <input
                type="radio"
                id={id}
                name={labelName}
                checked={value}
                onChange={valueHandler}
                className="hidden "
            />
            <label htmlFor={id} className="flex items-center gap-2 select-none cursor-pointer">
                <div
                    className={`w-5 cursor-pointer h-5 rounded-full border-2 border-red-900 flex items-center justify-center transition-colors ${value ? "bg-red-800" : "bg-transparent"
                        }`}
                >
                    {value && <div className="w-2 h-2 rounded-full bg-red-950" />}
                </div>
                <span className="text-white">{labelName}</span>
            </label>
        </div>
    );
};

export default RadioBtn;
