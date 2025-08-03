import React from "react"

const Continer = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`${className}   w-[1400px] flex justify-center items-center mx-auto`}>
            {children}
        </div>
    )
}

export default Continer