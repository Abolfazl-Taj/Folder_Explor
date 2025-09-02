import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Auth | Folderexpo",
  description: "Authentication pages",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script
        src="https://apis.google.com/js/platform.js"
        strategy="afterInteractive"
      />
    </>
  );
}
