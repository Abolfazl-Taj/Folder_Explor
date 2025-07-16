import Continer from "@/components/Continer"
import navbarItem from "../lib/navbarItem"
import Link from "next/link"

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen flex flex-col  bg-gradient-to-r from-[#000]/20 via-[#111]/20 to-[#222]/20">
      <Continer className="flex-col gap-4 p-4">
        <div className="w-full  bg-[#111]/90 backdrop-blur-md rounded-2xl border border-black/20 shadow-2xl p-4 text-white">
          <ul className="w-full flex gap-4 items-center">
            {navbarItem.map(i => {
              return <Link key={i.id} href={i.hreft}>{i.name}</Link>
            })}
          </ul>
        </div>
        <div className="text-white">
          awdawd
        </div>
      </Continer>
    </div>
  )
}

export default Dashboard