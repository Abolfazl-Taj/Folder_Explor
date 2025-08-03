"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
export default function Home() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  useEffect(() => {
    router.push("/dashboard")
  }, [])
  if (loading) return <div className="absolute w-full h-screen bg-[#111] flex justify-center items-center">
    <div className="bg-[white] w-full h-1/2 flex justify-center items-center py-4">
    <Loading />

    </div>
  </div>
  
  
}
