"use client";

import Container from "@/app/components/Continer";
import FormikForm from "@/app/components/FormikForm";
import Input from "@/app/components/Input";
import forgotPasswordScheme from "@/app/lib/schemas/forgotPassword";
import { MdAlternateEmail } from "react-icons/md";
import { useState } from "react";
import { postRequest } from "@/app/lib/fetchRequest";

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);

    const ForgotPasswordHandler = async (values: { email: string }) => {
    
        try {
            const { email } = values
            setLoading(true);
          const response = await  postRequest({ url: "/api/forgot-password", body: {email} })
          console.log(response);
          
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#2a2a2a]">
            <Container className="w-full max-w-2xl p-6 flex justify-center">
                <FormikForm
                    className="flex flex-col items-center gap-6 w-full rounded-xl shadow-2xl bg-[#111] py-10 px-8"
                    initialState={{ email: "" }}
                    schema={forgotPasswordScheme}
                    onSubmit={ForgotPasswordHandler}
                >
                    <h1 className="text-3xl font-extrabold text-white text-center">
                        Forgot your password?
                    </h1>
                    <p className="text-sm text-gray-400 text-center max-w-sm">
                        Please provide the email you used to sign up for our application.
                    </p>

                    <Input
                        className="w-full"
                        labelClass="text-white font-semibold"
                        inputClass="text-white"
                        labelName="Email"
                        name="email"
                        placeHolder="example@email.com"
                        type="text"
                        icon={<MdAlternateEmail className="text-white" />}
                    />

                    <button
                        className="w-full px-4 py-2 border border-white/20 text-white rounded-md font-medium hover:bg-[#222] hover:font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        type="submit"
                        aria-label="Send reset password link"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send"}
                    </button>
                </FormikForm>
            </Container>
        </main>
    );
};

export default ForgotPassword;
