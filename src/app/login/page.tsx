"use client"
import Continer from "@/components/Continer"
import FormikForm from "@/components/FormikForm";
import Input from "@/components/Input"
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import LoginScheme from "../lib/schemas/Login";
import { postRequest } from "../lib/fetchRequest";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const router = useRouter()
    const submithandler = async (value: { email: string; password: string }) => {
        const res = await postRequest({
            url: "http://localhost:3000/api/login/",
            body: value,
        });
        router.push("/dashboard")

    };

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-[#222] via-[#111] to-[#333] ">
            <Continer>
                <div className="flex flex-col gap-4 text-white bg-[#000]/25 backdrop-blur-md border border-[#000]/30 shadow shadow-zinc-800  rounded-md p-12">
                    <h1 className="font-semibold text-2xl text-center">Welcome Back!</h1>
                    <p className="text-sm text-gray-300 text-justify font-thin">We missed you just few just steps to get back in town</p>
                    <div className="flex flex-col gap-4">
                        <FormikForm initialState={{ email: "", password: "" }} schema={LoginScheme} onSubmit={submithandler}>
                            <Input labelName="Email" name="email" placeHolder="you@gmail.com" type="text" icon={<MdAlternateEmail />} />
                            <Input labelName="Password" name="password" placeHolder="******" type="password" icon={<RiLockPasswordLine />} />
                            <button type="submit" className="bg-[#222]/40 px-4 py-1 rounded hover:bg-[#222]">Login</button>

                        </FormikForm>
                    </div>
                </div>
            </Continer>
        </div>
    )
}

export default LoginPage