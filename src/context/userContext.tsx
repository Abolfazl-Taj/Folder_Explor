import { userContextType } from "@/types/user";
import { createContext } from "react";

const userContext = createContext<userContextType | null | any>(null)
export default userContext