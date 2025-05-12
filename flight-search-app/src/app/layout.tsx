import type { Metadata } from "next";
import React from 'react';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import '@/styles/globals.scss';

export const metadata: Metadata = {
    title: "Flight Search App",
    description: "Transavia FED Assignment",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <ThemeRegistry>{children}</ThemeRegistry>
            </body>
        </html>
    );
}
