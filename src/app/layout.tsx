// app/layout.tsx

import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from "next-themes";
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: "CodeINBlogs",
  description: "Fastest-Growing Web Dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || headersList.get("x-invoke-path") || "";
  const isHomePage = pathname === "/";

  return (
    <html lang="en">
      <body className={`${GeistSans.className} ${isHomePage ? 'dark' : ''}`}>
        <ThemeProvider attribute="class" defaultTheme={isHomePage ? 'dark' : 'light'}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
