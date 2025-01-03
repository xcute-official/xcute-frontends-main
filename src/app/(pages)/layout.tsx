import type { Metadata } from "next";
import React from "react";
import PrimeNav from "./_components/PrimeNav";
import './globals.css';
import Footer from "./_components/Footer";
import { UserSessionProvider } from "../contexts/user-session";
export const metadata: Metadata = {
    title: '',
    description: ''
};
interface LayoutIntrfc {
    children: React.ReactNode;
}
const layout: React.FC<LayoutIntrfc> = ({children}) => {
  return (
    <UserSessionProvider>
        <html data-theme="dark">
            <body className="bg-background text-foreground">
                <header className="fixed top-0 left-0 w-screen flex items-center h-[10vh] px-4 bg-background">
                    <PrimeNav />
                </header>
                <main className="mt-[10vh] p-4">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    </UserSessionProvider>
  )
};

export default layout;
