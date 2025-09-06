// app/layout.tsx or app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Userprovider from "@/provider/Userprovider";
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import Script from "next/script";

const interFont = Inter({
  variable: "--font-Inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Folder Explorer",
  description: "an aplication based for uploading files and storing them for use later",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body className={`${interFont.variable} antialiased relative`}>
          <Userprovider>{children}</Userprovider>
        </body>
      </ReactQueryProvider>
    </html>
  );
}
