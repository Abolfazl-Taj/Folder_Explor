"use client";
import { postRequest } from "@/app/lib/fetchRequest";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
const LogOut = () => {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            try {
                await postRequest({ url: "/api/logout" });
            } catch (err) {
                console.error(err);
            }
        };

        logout();
    }, [router]);


    redirect("/login")
};

export default LogOut;
