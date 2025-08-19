import {
  FaFileLines,
  FaJava,
  FaMarkdown,
  FaPython,
  FaRust,
} from "react-icons/fa6";
import {
  FaHtml5,
  FaReact,
  FaCss3,
  FaPhp,
  FaFilePdf,
  FaImages,
} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import {
  SiC,
  SiCplusplus,
  SiDart,
  SiDocker,
  SiGnubash,
  SiGo,
  SiHellyhansen,
  SiJson,
  SiKotlin,
  SiLua,
  SiMongodb,
  SiMysql,
  SiRuby,
  SiSwift,
  SiTypescript,
  SiYaml,
} from "react-icons/si";
import { PiFileCSharpBold } from "react-icons/pi";
import { IoLogoVue } from "react-icons/io5";
const icons = {
  // Web
  ".html": <FaHtml5 />,
  ".css": <FaCss3 />,
  ".js": <IoLogoJavascript />,
  ".ts": <SiTypescript />,
  ".jsx": <FaReact />,
  ".tsx": <FaReact />,
  ".vue": <IoLogoVue />,
  ".json": <SiJson />,
  ".yaml": <SiYaml />,
  ".yml": <SiYaml />,
  ".md": <FaMarkdown />,

  //Document
  ".pdf": <FaFilePdf />,
  // Backend / Systems
  ".php": <FaPhp />,
  ".py": <FaPython />,
  ".java": <FaJava />,
  ".c": <SiC />,
  ".cpp": <SiCplusplus />,
  ".cs": <PiFileCSharpBold />,
  ".go": <SiGo />,
  ".rs": <FaRust />,
  ".rb": <SiRuby />,
  ".kt": <SiKotlin />,
  ".swift": <SiSwift />,
  ".dart": <SiDart />,
  ".lua": <SiLua />,
  ".sh": <SiGnubash />,
  ".ps1": <SiHellyhansen />,
  ".dockerfile": <SiDocker />,

  // Database
  ".sql": <SiMysql />,
  ".db": <SiMongodb />,
  //images
  ".png": <FaImages />,
  ".jpg": <FaImages />,

  // Default fallback
  default: <FaFileLines />,
};
export default icons;
