import { ExpoContextType } from "@/types/Expo";
import { createContext } from "react";

;

const ExpoContext = createContext<ExpoContextType | null | undefined | any>(null)
export default ExpoContext