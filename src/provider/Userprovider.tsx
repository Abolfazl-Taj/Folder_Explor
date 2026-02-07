"use client"
import { getRequest } from "@/app/lib/fetchRequest"
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "@/app/lib/localStorgeRequest"
import userContext from "@/context/userContext"
import { userType } from "@/types/user"
import { redirect, useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import Loading from "@/app/components/Loading"

const authRoutes = ["/login", "/register", "/logout"]

const Userprovider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<userType | null | undefined>(null)
    const router = useRouter()
    const pathName = usePathname()
    const { data, refetch, isLoading, error } = useQuery({
        queryKey: ["profile_details", "id"],
        queryFn: async () => {
            try {
                const res = await getRequest({ url: "/api/me" })
                if (res.redirect || res.user === undefined) return router.push("/login")
                return res.user
            } catch (error) {
                removeFromLocalStorage("user");
                setUser(null);
                router.push("/login");
                throw error
            }
        }
    })
    useEffect(() => {
        setUser(data)
        setToLocalStorage("user", data)
    }, [data])
    useEffect(() => {
        if (authRoutes.some(path => path === pathName)) return
        const storedUser = getFromLocalStorage("user");
        const shouldForceRefresh = pathName === "/settings"; // for example
        
        if (!storedUser || shouldForceRefresh) {
            refetch()
        } else {
            setUser(storedUser);
        }
    }, [pathName]);
    
    
    if (isLoading) return <Loading />
    return (
        <userContext.Provider value={{ user, setUser, error }}>
            {children}
        </userContext.Provider>
    );
}

export default Userprovider
