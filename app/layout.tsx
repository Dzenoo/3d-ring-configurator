import type { Metadata } from "next";
import { Dancing_Script } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ring Configurator",
  description: "3D WebGL Ring Configurator",
};

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dancing-script",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dancingScript.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
