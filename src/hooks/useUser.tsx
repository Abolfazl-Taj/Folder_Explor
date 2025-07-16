import { useContext } from "react";
import userContext from "@/context/userContext";

export function useUser() {
    const context = useContext(userContext);
    if (!context) {
        return null
    }
    return context; 
}
