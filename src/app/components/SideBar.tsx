"use client"
import navbarItem from '@/app/lib/navbarItem'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import { GrClose } from 'react-icons/gr'

const SideBar = () => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return (
        <>
            {/* Desktop Sidebar */}
            <ul className="hidden md:flex flex-col gap-4 p-4 items-center w-[10%] min-h-full shadow border-r border-gray-300/40">
                {navbarItem.map(i => (
                    <Link
                        key={i.id}
                        href={i.hreft}
                        className={`text-left w-full rounded p-2 transition-all
                            ${pathname.startsWith(i.hreft) 
                                ? "font-bold scale-105 bg-[#222]" 
                                : "hover:bg-blue-400/20"
                            }`}
                    >
                        {i.name}
                    </Link>
                ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`md:hidden fixed top-20 left-4 z-50 p-2 rounded-lg 
                    bg-[#1a1a1a]/50 backdrop-blur-md border border-red-900/30 
                    shadow-2xl hover:bg-red-900/20 transition-all
                    ${isOpen ? "hidden" : "inline-flex"}`}
            >
                <FiMenu className="text-red-800 text-2xl" />
            </button>

            {/* Backdrop */}
            <div
                onClick={() => setIsOpen(false)}
                className={`md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300
                    ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            />

            {/* Mobile Drawer */}
            <div
                className={`md:hidden fixed top-0 left-0 z-50 h-full w-4/5 max-w-xs
                    bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-white/10
                    flex flex-col px-4 py-6 gap-6
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Header */}
                <div className="relative flex items-center justify-center">
                    <h1 className="font-black text-2xl text-center">
                        Folder Expo
                    </h1>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 p-1 
                            text-white/70 hover:text-red-600 transition-colors"
                    >
                        <GrClose className="text-xl" />
                    </button>
                </div>

                {/* Links */}
                <nav className="flex flex-col gap-2">
                    {navbarItem.map(i => (
                        <Link
                            key={i.id}
                            href={i.hreft}
                            className={`flex items-center gap-4 w-full p-3 rounded-lg border-b border-white/5
                                transition-all
                                ${pathname.startsWith(i.hreft)
                                    ? "font-bold scale-[1.02] border-red-900 bg-red-950/30"
                                    : "hover:bg-white/5"
                                }`}
                        >
                            <span className="text-2xl text-red-800">
                                {i.icon}
                            </span>
                            <span className="text-lg">
                                {i.name}
                            </span>
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    )
}

export default SideBar