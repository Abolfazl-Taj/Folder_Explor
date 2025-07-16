"use client";
import { postRequest } from "@/app/lib/fetchRequest";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogOut = () => {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            try {
                await postRequest({ url: "/api/logout" });
                router.push("/login");
            } catch (err) {
                console.error(err);
            }
        };

        logout();
    }, [router]);

    return <p>Logging out...</p>; // Return some JSX
};

export default LogOut;
