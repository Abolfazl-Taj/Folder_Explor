"use client"
import navbarItem from '@/app/lib/navbarItem'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SideBar = () => {
    const pathname = usePathname()
    return (
        <>
            <ul className={`md:flex flex-col gap-4 p-4 items-center w-[10%] min-h-full shadow  border-r border-gray-300/40 hidden `}>
                {navbarItem.map(i => (
                    <Link className={`text-left w-full rounded p-2  ${pathname.startsWith(i.hreft) ? "font-bold scale-105  bg-[#222]" : ""}
                    hover:bg-blue-400/20 transition-all 
                    `} key={i.id} href={i.hreft}>{i.name}</Link>
                ))}
            </ul>
            <ul className='md:hidden fixed bottom-3 left-0 w-full bg-[#000]/20 px-4 py-5 flex justify-center items-center gap-2 border rounded-full border-black/20'>
                {navbarItem.map(i => (
                    <Link className={` 
                        flex justify-center items-center p-2 text-center text-2xl relative  ${pathname.startsWith(i.hreft) ? "font-bold  bg-[#222] rounded-full" : ""}`} key={i.id} href={i.hreft}>{i.icon}</Link>))}
            </ul>
        </>
    )
}

export default SideBar