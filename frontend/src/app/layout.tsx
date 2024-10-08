import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import ClientProvider from "@/providers/ClientProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Skaters",
  description: "An open source e-commerce project built by inifarhan",
  category: "ecommerce",
  authors: { name: "inifarhan" },
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "Skateboard",
    "Shoes",
    "Accessories",
    "Clothing",
  ],
  creator: "Muhammad Farhan Gunawan",
  publisher: "Muhammad Farhan Gunawan",
  openGraph: {
    title: "Skaters",
    description: "An open source e-commerce project built by inifarhan",
    url: "https://skaters-inifarhan.vercel.app/",
    siteName: "Skaters",
    images: "https://skaters-inifarhan.vercel.app/images/screenshoot.PNG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skaters",
    description: "An open source e-commerce project built by inifarhan",
    images: ["https://skaters-inifarhan.vercel.app/images/screenshoot.PNG"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
