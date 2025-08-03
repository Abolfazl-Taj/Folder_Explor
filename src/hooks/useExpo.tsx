
import ExpoContext from "@/context/ExpoContext";
import { useContext } from "react"

const useExpo = () => {
    const value = useContext(ExpoContext)
    if (value) {
        return value
    } else {
        console.log("folder or file are missing");

    }
}

export default useExpo