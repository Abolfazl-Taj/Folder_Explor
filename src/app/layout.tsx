// app/layout.tsx or app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Userprovider from "@/provider/Userprovider";
import ReactQueryProvider from "@/provider/ReactQueryProvider";

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
      <head>
        <meta
          name="google-signin-client_id"
          content="725854454434-s0ckddk35qnqm9dlm7l8aqmk7g938rvi.apps.googleusercontent.com"
        />
      </head>
      <ReactQueryProvider>
        <body className={`${interFont.variable} antialiased relative`}>
          <Userprovider>{children}</Userprovider>
        </body>
      </ReactQueryProvider>
    </html>
  );
}
