import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "./components/NavBar/NavBar";
import { NextAuthProvider } from "./Provider";
import { ReduxProvider } from "./storeProvider/storeProvider";
import "animate.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-primary">
      <body className={inter.className}>
        <NextAuthProvider>
          <ReduxProvider>
            <div className="max-w-screen-2xl mx-auto h-full flex flex-col min-h-[100vh]">
              <NavBar />
              {children}
            </div>
          </ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
