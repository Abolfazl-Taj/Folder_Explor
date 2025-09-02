"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { postRequest } from "@/app/lib/fetchRequest";
import { removeFromLocalStorage } from "@/app/lib/localStorgeRequest";
import Loading from "@/app/components/Loading";

const LogoutPage = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            try {
                await postRequest({ url: "/api/logout" });

                removeFromLocalStorage("user");

                // redirect after everything
                router.replace("/login");
            } catch (err) {
                console.error("Logout failed:", err);
                setLoading(false); // stop loading if error
            }
        };

        logout();
    }, [router]);

    if (!loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500">Logout failed. Please try again.</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center h-screen w-full bg-gradient-to-tr from-[#111] to-[#3f3f3f]">
            <Loading className="text-white" />
        </div>
    );
};

export default LogoutPage;
