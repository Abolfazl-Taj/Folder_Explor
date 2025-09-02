"use client"
import Continer from "@/app/components/Continer"
import FormikForm from "@/app/components/FormikForm";
import Input from "@/app/components/Input"
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import LoginScheme from "@/app/lib/schemas/Login";
import { postRequest } from "@/app/lib/fetchRequest";
import { redirect, useRouter } from "next/navigation";
import { getFromLocalStorage, setToLocalStorage } from "@/app/lib/localStorgeRequest";
import { useEffect, useState } from "react";
import Link from "next/link";

const LoginPage = () => {
    const router = useRouter()
    const [error, setError] = useState<any>()
    const [auth2, setAuth2] = useState<any>(null);

    const submithandler = (value: { email: string; password: string }) => {
        const safeEmail = value.email.trim().toLocaleLowerCase()
        const safePassword = value.password.trim()
        postRequest({
            url: "/api/login/",
            body: { email: safeEmail, password: safePassword },
        }).then(res => {
            setToLocalStorage("user", res.user)
            router.push("/dashboard")
        }).catch((err) => {
            console.log(err);
            setError(err.response?.data?.message || "Login failed");
        })
    };

    useEffect(() => {
        if (getFromLocalStorage("user")) return redirect("/dashboard")
    }, []);

    // Initialize Google auth
    useEffect(() => {
        if (!window.gapi) return;
        window.gapi.load("auth2", () => {
            const auth = window.gapi.auth2.init({
                client_id: "725854454434-s0ckddk35qnqm9dlm7l8aqmk7g938rvi.apps.googleusercontent.com.apps.googleusercontent.com",
            });
            setAuth2(auth);
        });
    }, []);

    const handleGoogleSignIn = async () => {
        if (!auth2) return console.error("Google Auth not initialized yet");

        auth2.signIn().then((googleUser: any) => {
            const id_token = googleUser.getAuthResponse().id_token;

            postRequest({
                url: "/api/auth/google",
                body: { token: id_token },
            })
                .then((res) => {
                    setToLocalStorage("user", res.user);
                    router.push("/dashboard");
                })
                .catch((err) => console.error(err));
        });
    };

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-[#222] via-[#111] to-[#333]">
            <Continer>
                <div className="flex flex-col gap-4 text-white bg-[#000]/25 backdrop-blur-md border border-[#000]/30 shadow shadow-zinc-800 rounded-md p-12">
                    <h1 className="font-semibold text-2xl text-center">Welcome Back!</h1>
                    <p className="text-sm text-gray-300 text-justify font-thin">
                        We missed you, just a few steps to get back in town
                    </p>
                    {/* --- Google Sign-in Button --- */}
                    <button
                        onClick={handleGoogleSignIn}
                        className="flex items-center justify-center gap-2 w-full 
                            bg-[#111] text-gray-200 border border-gray-700
                            font-semibold py-2 rounded-md 
                            hover:bg-[#222] hover:border-gray-500 
                            transition duration-200"
                    >
                        <img src="/google.svg" alt="Google" className="w-5 h-5" />
                        Continue with Google
                    </button>
                    {/* --- Divider --- */}
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] flex-1 bg-gray-700" />
                        <span className="text-gray-400 text-sm">or</span>
                        <div className="h-[1px] flex-1 bg-gray-700" />
                    </div>
                    {/* --- Login Form --- */}
                    <div className="flex flex-col gap-4">
                        <FormikForm
                            className="flex flex-col gap-3"
                            initialState={{ email: "", password: "" }}
                            schema={LoginScheme}
                            onSubmit={submithandler}
                        >
                            <Input
                                labelName="Email"
                                name="email"
                                placeHolder="you@gmail.com"
                                type="text"
                                icon={<MdAlternateEmail />}
                            />
                            <Input
                                labelName="Password"
                                name="password"
                                placeHolder="******"
                                type="password"
                                icon={<RiLockPasswordLine />}
                            />
                            <button
                                type="submit"
                                className="bg-[#222]/40 px-4 py-1 rounded hover:bg-[#222] self-center w-1/3"
                            >
                                Login
                            </button>
                        </FormikForm>
                    </div>

                    {error && (
                        <span className="w-full text-center bg-red-500 font-bold text-white py-1 rounded-md">
                            {error}
                        </span>
                    )}





                    <Link
                        className="w-full flex justify-center font-bold text-xs text-center text-blue-500"
                        href={"/register"}
                    >
                        <p className="w-fit hover:border-b">New around here? Sign up!</p>
                    </Link>

                    <Link
                        className="w-full flex justify-center font-bold text-xs text-center text-gray-400"
                        href={"/forgot-password"}
                    >
                        <p className="w-fit">Forget your password?</p>
                    </Link>
                </div>
            </Continer>
        </div>
    )
}

export default LoginPage
