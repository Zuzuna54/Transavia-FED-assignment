import type { Metadata } from "next";
import React from 'react';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import '@/styles/globals.scss';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Flight Search App",
    description: "Transavia FED Assignment",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    console.log("--- Rendering RootLayout ---");
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeRegistry>{children}</ThemeRegistry>
            </body>
        </html>
    );
}
