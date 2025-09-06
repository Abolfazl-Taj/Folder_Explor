import type { Metadata } from "next";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata: Metadata = {
  title: "Auth | Folderexpo",
  description: "Authentication pages",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
      {children}
    </GoogleOAuthProvider>
  );
}
