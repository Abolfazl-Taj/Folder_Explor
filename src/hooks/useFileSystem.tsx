
import ExpoContext from "@/context/FileSystemContext";
import { useContext } from "react"

const useFileSystem = () => {
    const value = useContext(ExpoContext)
    if (value) {
        return value
    } else {
        console.log("folder or file are missing");

    }
}

export default useFileSystem