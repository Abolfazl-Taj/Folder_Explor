"use client"
import navbarItem from '@/app/lib/navbarItem'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SideBar = () => {
    const pathname = usePathname()
    return (
        <>
            <ul className={`md:flex flex-col gap-4 p-4 items-center w-[10%] min-h-full shadow  border-r border-gray-300/40 hidden   `}>
                {navbarItem.map(i => (
                    <Link className={`text-left w-full ${pathname.startsWith(i.hreft) ? "font-bold  p-2 rounded bg-[#222]" : ""}`} key={i.id} href={i.hreft}>{i.name}</Link>
                ))}
            </ul>
            <ul className='md:hidden fixed bottom-0 left-0 w-full bg-[#000]/20 px-4 py-5 flex justify-center items-center gap-2 '>
                {navbarItem.map(i => (
                    <Link className={` flex justify-center items-center p-2 text-center text-2xl  ${pathname.startsWith(i.hreft) ? "font-bold  bg-[#222] rounded-full" : ""}`} key={i.id} href={i.hreft}>{i.icon}</Link>
                ))}            </ul>
        </>
    )
}

export default SideBar