import React from "react"

const Continer = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`${className} w-full  md:w-[1400px] flex justify-center items-center md:mx-auto h-full `}>
            {children}
        </div>
    )
}

export default Continer