"use client"
import { getRequest } from "@/app/lib/fetchRequest"
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "@/app/lib/localStorgeRequest"
import userContext from "@/context/userContext"
import { userType } from "@/types/user"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"
import { usePathname } from "next/navigation";
const authRoutes = ["/login", "/register", "/logout"]
const Userprovider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<userType | null | undefined>(null);
    const router = useRouter()
    const pathName = usePathname()
    useEffect(() => {
        if (authRoutes.includes(pathName)) return
        const user = getFromLocalStorage("user")
        if (!user || user === undefined) {
            try {
                getRequest({ url: "/api/me" }).then(res => {
                    setUser(res.data)
                    setToLocalStorage("user", res.data)
                })
            } catch (error) {
                router.push("/login")
                removeFromLocalStorage("user")
                setUser(null)
            }
        }
    }, [])
    return (
        <userContext.Provider value={{ setUser: setUser, user: user }}>
            {children}
        </userContext.Provider>
    )
}

export default Userprovider