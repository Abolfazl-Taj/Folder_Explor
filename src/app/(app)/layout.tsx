import Continer from "@/app/components/Continer"
import SideBar from "@/app/components/SideBar"
import ExpoProvider from "@/provider/Expoprovider"
import { ReactNode } from "react"

const AppLayout = ({ children }: { children: ReactNode }) => {

    return <ExpoProvider>
        <div className="w-full min-h-screen flex flex-col bg-gradient-to-r from-[#000]/20 via-[#111]/20 to-[#222]/20">
            <Continer className="gap-4 mt-12">
                <div className="bg-gradient-to-br from-white/5 via-[#1a1a1a]/40 to-[#0f0f0f]/60 backdrop-blur-[6px] backdrop-saturate-[180%]  rounded-[12px] w-full h-[700px] text-white
         border border-white/20 gap-2 flex justify-between glassShadow ">
                    <SideBar />
                    {children}
                </div>
            </Continer>
        </div>
    </ExpoProvider>
}
export default AppLayout