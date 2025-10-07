'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import "./globals.css";
import NavBar from "../components/NavBar";
import { NewTask } from "../components/NewTask";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Theme appearance="dark">
          <header className="fixed top-0 left-0 w-full z-50 bg-[#1a1a1a] border-b border-[#444444]">
            <NavBar onNewTaskClick={() => setIsNewTaskOpen(true)} />
          </header>
          <NewTask isOpen={isNewTaskOpen} onOpenChange={setIsNewTaskOpen} />
          <main className="pt-20">
            {children}
          </main>
        </Theme>
      </body>
    </html>
  );
}