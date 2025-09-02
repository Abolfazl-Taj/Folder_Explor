"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { postRequest } from "@/app/lib/fetchRequest";
import { toast } from "react-toastify"

const ResetPasswordPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token"); // get token from URL

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            toast.error("Invalid reset link!");
            return;
        }
        if (!password || !confirmPassword) {
            toast.error("Please fill in both fields!");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            const res = await postRequest({
                url: "/api/reset-password",
                body: { token, password },
            });
            toast.success("Password reset successful!");
            router.push("/login"); // redirect to login page
        } catch (err: any) {
            console.error(err);
            toast.error(err?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#2a2a2a]">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-4"
            >
                <h1 className="text-2xl font-bold text-center">Reset Password</h1>

                <input
                    type="password"
                    placeholder="New Password"
                    className="p-3 rounded-md bg-gray-700 border border-gray-600 outline-none focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="p-3 rounded-md bg-gray-700 border border-gray-600 outline-none focus:border-blue-500"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 transition-colors p-3 rounded-md font-bold"
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordPage;
