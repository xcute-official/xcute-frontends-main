import type { Metadata } from "next";
import React from "react";
import PrimeNav from "./_components/PrimeNav";
import './globals.css';
import Footer from "./_components/Footer";
export const metadata: Metadata = {
    title: '',
    description: ''
};
interface LayoutIntrfc {
    children: React.ReactNode;
}
const layout: React.FC<LayoutIntrfc> = ({children}) => {
  return (
    <html data-theme="dark">
        <body className="bg-background text-foreground">
            <header className="fixed top-0 left-0 w-screen flex items-center h-[10vh] px-4">
                <PrimeNav />
            </header>
            <main className="mt-[10vh] p-4">
                {children}
            </main>
            <Footer />
        </body>
    </html>
  )
};

export default layout;
