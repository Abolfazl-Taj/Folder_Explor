"use client"
import Continer from "@/app/components/Continer"
import FormikForm from "@/app/components/FormikForm";
import Input from "@/app/components/Input"
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import LoginScheme from "@/app/lib/schemas/Login";
import { postRequest } from "@/app/lib/fetchRequest";
import { useRouter } from "next/navigation";
import { getFromLocalStorage, setToLocalStorage } from "@/app/lib/localStorgeRequest";
import { useEffect } from "react";
import Link from "next/link";

const LoginPage = () => {
    const router = useRouter()
    const submithandler = (value: { email: string; password: string }) => {
        postRequest({
            url: "/api/login/",
            body: value,
        }).then(res => {
            setToLocalStorage("user", res.user)
            router.push("/dashboard")
        })
    };
    useEffect(() => {
        if (getFromLocalStorage("user"))
            router.push("/dashboard")
    }, [])
    return (
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-[#222] via-[#111] to-[#333] ">
            <Continer>
                <div className="flex flex-col gap-4 text-white bg-[#000]/25 backdrop-blur-md border border-[#000]/30 shadow shadow-zinc-800  rounded-md p-12">
                    <h1 className="font-semibold text-2xl text-center">Welcome Back!</h1>
                    <p className="text-sm text-gray-300 text-justify font-thin">We missed you just few just steps to get back in town</p>
                    <div className="flex flex-col gap-4">
                        <FormikForm className="flex flex-col gap-3" initialState={{ email: "", password: "" }} schema={LoginScheme} onSubmit={submithandler}>
                            <Input labelName="Email" name="email" placeHolder="you@gmail.com" type="text" icon={<MdAlternateEmail />} />
                            <Input labelName="Password" name="password" placeHolder="******" type="password" icon={<RiLockPasswordLine />} />
                            <button type="submit" className="bg-[#222]/40 px-4 py-1 rounded hover:bg-[#222] self-center w-1/3">Login</button>
                        </FormikForm>
                    </div>
                    <Link className="w-full flex justify-center font-bold text-xs text-center text-gray-500 " href={"/register"}>
                        <p className="w-fit border-b">New around here ? sign up!</p>
                    </Link>
                </div>
            </Continer>
        </div>
    )
}

export default LoginPage