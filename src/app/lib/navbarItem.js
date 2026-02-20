import { IoLogoBuffer, IoMdSettings } from "react-icons/io";
import { IoExitSharp } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { TiCloudStorage } from "react-icons/ti";

const navbarItem = [
  { id: 1, name: "Dashboard", hreft: "/dashboard", icon: <MdSpaceDashboard /> },
  { id: 2, name: "Useage", hreft: "/useage", icon: <TiCloudStorage /> },
  { id: 3, name: "Settings", hreft: "/settings", icon:<IoMdSettings/>},
  { id: 4, name: "Logs", hreft: "/logs", icon:<IoLogoBuffer/> },
  { id: 5, name: "logout", hreft: "/logout", icon: <IoExitSharp />},
];
export default navbarItem;
