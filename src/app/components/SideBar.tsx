"use client"
import navbarItem from '@/app/lib/navbarItem'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { GrClose } from 'react-icons/gr'

const SideBar = () => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <ul className={`md:flex flex-col gap-4 p-4 items-center w-[10%] min-h-full shadow  border-r border-gray-300/40 hidden `}>
                {navbarItem.map(i => (
                    <Link className={`text-left w-full rounded p-2  ${pathname.startsWith(i.hreft) ? "font-bold scale-105  bg-[#222]" : ""}
                    hover:bg-blue-400/20 transition-all 
                    `} key={i.id} href={i.hreft}>{i.name}</Link>
                ))}
            </ul>

            <button
                onClick={() => setIsOpen(true)}
                className={`${isOpen ? "!hidden" : "fixed lg:hidden"}  top-20 left-4 inline-flex z-50 shadow-2xl p-2 rounded-lg bg-[#1a1a1a]/50 backdrop-blur-md border border-red-900/30  hover:bg-red-900/20 transition-all`}
            >
                <FiMenu className="text-red-800 text-2xl" />
            </button>
            <div className={`absolute w-4/5 bg-[#000]/60 !backdrop-blur-3xl h-full z-50 flex flex-col px-4 py-6 gap-6 transition-all ${isOpen ? "left-0" : "left-[-100%]"}`}>
                <h1 className='justify-center w-full font-black text-center text-3xl relative'>
                    <span>Folder Expo</span>
                    <button onClick={() => setIsOpen(false)} className='!text-[20px] hover:text-red-950 pointer-coarse absolute left-0 top-0' ><GrClose /></button>
                </h1>
                {navbarItem.map(i => (
                    <Link className={`text-left w-full border-b  p-2  ${pathname.startsWith(i.hreft) ? "font-bold scale-105  border-red-900" : ""}
                    hover:bg-blue-400/20 transition-all flex items-center gap-4
                    `} key={i.id} href={i.hreft}>
                        <span className='text-2xl text-red-800'>
                            {i.icon}
                        </span>
                        <span className='text-xl'>
                            {i.name}
                        </span>
                    </Link>
                ))}
            </div>

        </>
    )
}

export default SideBar