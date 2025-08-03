"use client"
import navbarItem from '@/app/lib/navbarItem'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SideBar = () => {
    const pathname = usePathname()
    return (
        <ul className={`flex flex-col gap-4 p-4 items-center w-[10%] h-full shadow  border-r border-gray-300/40  `}>
            {navbarItem.map(i => (
                <Link className={`text-left w-full ${pathname.startsWith(i.hreft)  ? "font-bold  p-2 rounded bg-[#222]" : ""}`} key={i.id} href={i.hreft}>{i.name}</Link>
            ))}
        </ul>
    )
}

export default SideBar