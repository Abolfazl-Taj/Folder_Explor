"use client"
import { getRequest } from "@/app/lib/fetchRequest"
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "@/app/lib/localStorgeRequest"
import userContext from "@/context/userContext"
import { userType } from "@/types/user"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"
import { usePathname } from "next/navigation"

const authRoutes = ["/login", "/register", "/logout"]

const Userprovider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<userType | null | undefined>(null)
    const router = useRouter()
    const pathName = usePathname()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authRoutes.includes(pathName)) {
            setLoading(false);
            return;
        }

        const storedUser = getFromLocalStorage("user");

        if (!storedUser || storedUser === undefined) {
            getRequest({ url: "/api/me" })
                .then(res => {
                    setUser(res.user);
                    setToLocalStorage("user", res.user);
                    setLoading(false);
                })
                .catch(() => {
                    removeFromLocalStorage("user");
                    setUser(null);
                    setLoading(false);
                    router.push("/login");
                });
        } else {
            setUser(storedUser);
            setLoading(false);
        }
    }, [pathName]);

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    );
}

export default Userprovider
