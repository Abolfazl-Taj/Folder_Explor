import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
const JWT_SECRET = process.env.JWT_SECRET || "my_super_secret_key";


const getCurrentUserId = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value
    if (!token) return null;
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const id = decoded.id
    try {
        return id
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}

export default getCurrentUserId