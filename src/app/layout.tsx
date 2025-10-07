import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import "./globals.css";
import NavBar from '@/components/NavBar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loomtask Mockup",
  description: "A mockup for Loomtask",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Theme appearance="dark">
          <NavBar />
          {children}
        </Theme>
      </body>
    </html>
  );
}