"use client"
import FormikForm from "@/components/FormikForm";
import Input from "@/components/Input"
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { postRequest } from "@/app/lib/fetchRequest";
import { useRouter } from "next/navigation";
import Continer from "@/components/Continer";
import RegisterScheme from "@/app/lib/schemas/register";
import { BsFillShieldLockFill } from "react-icons/bs";
import {useEffect } from "react";
import { getFromLocalStorage, setToLocalStorage } from "@/app/lib/localStorgeRequest";

const RegisterPage = () => {
    const router = useRouter()
    const submithandler = (value: { email: string; password: string }) => {
        postRequest({
            url: "/api/register/",
            body: value,
        }).then(res => {
            setToLocalStorage("user", res.user)
            router.push("/dashboard")
        })
    };
    useEffect(() => {
        if (getFromLocalStorage("user")) router.push("/dashboard")
    }, [])
    return (
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-[#222] via-[#111] to-[#333] ">
            <Continer>
                <div className="w-[510px] flex flex-col gap-4 text-white bg-[#000]/25 backdrop-blur-md border border-[#000]/30 shadow shadow-zinc-800  rounded-md p-12">
                    <h1 className="font-semibold text-2xl text-center text-white">
                        Welcome to Folder Expo
                    </h1>
                    <h4 className="text-gray-300 text-center border-b border-gray-600 pb-1 mt-2">
                        Love to see you here
                    </h4>
                    <p className="text-sm text-gray-500 text-center mt-2 font-normal">
                        Just a few steps to get into the magic world
                    </p>

                    <div className="flex flex-col gap-4 flex-1">
                        <FormikForm
                            initialState={{ email: "", password: "", confirmPass: "" }}
                            schema={RegisterScheme} onSubmit={submithandler}>
                            <Input labelName="Email" name="email" placeHolder="you@gmail.com" type="text" icon={<MdAlternateEmail />} />
                            <Input labelName="Password" name="password" placeHolder="******" type="password" strengthBar={true} icon={<RiLockPasswordLine />} />
                            <Input labelName="Confirm Password" name="confirmPass" placeHolder="******" type="confirmPassword" icon={<BsFillShieldLockFill />} />
                            <button type="submit" className="bg-[#222]/40 px-4 py-1 rounded hover:bg-[#222]">Sign up!</button>

                        </FormikForm>
                    </div>
                </div>
            </Continer>
        </div>)
}

export default RegisterPage