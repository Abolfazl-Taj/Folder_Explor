import Continer from "@/app/components/Continer"
import SideBar from "@/app/components/SideBar"
import ExpoProvider from "@/provider/Expoprovider"
import { ReactNode } from "react"
import { Bounce, ToastContainer } from "react-toastify"
const AppLayout = ({ children }: { children: ReactNode }) => {
    return <ExpoProvider>
        <div className="min-w-full min-h-screen overflow-hidden  animatedbg flex flex-col items-start md:justify-center md:items-center bg-gradient-to-r from-[#000]/20 via-[#111]/20 to-[#222]/20">
            <Continer className="gap-4">
                <div className="bg-gradient-to-br from-white/5 via-[#1a1a1a]/80 to-[#0f0f0f]/60 backdrop-blur-[6px] backdrop-saturate-[180%]  rounded-[12px] w-full  text-white
         border border-white/20 gap-2 flex justify-between min-h-screen md:min-h-[700px]">
                    <SideBar />
                    {children}
                </div>

            </Continer>
        </div>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
        />
    </ExpoProvider>
}
export default AppLayout