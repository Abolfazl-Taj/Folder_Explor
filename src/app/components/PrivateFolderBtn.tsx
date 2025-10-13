"use client";
import { useState } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { patchRequest } from "../lib/fetchRequest";

interface PrivateFolderBtnProps {
    id: string;
    private: boolean;
}


const PrivateFolderBtn = ({ id, private: isPrivate }: PrivateFolderBtnProps) => {
    const [value, setValue] = useState(isPrivate);

    const handleToggle = async () => {        
        const newValue = !value;
        setValue(newValue);
        try {
            await patchRequest("/api/folder", {
                id,
                private: newValue,
            })

        } catch (err) {

            console.log(err);

        }
    };

    return (
        <div className="absolute right-10">

            <button
                onClick={handleToggle}
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors text-center text-[20px] ${value ? "text-red-900" : ""}`}
            >
                {value ? <FaLock /> : <FaLockOpen />}
            </button>
        </div>
    );
};

export default PrivateFolderBtn;
