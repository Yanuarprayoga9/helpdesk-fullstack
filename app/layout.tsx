import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import 'react-quill-new/dist/quill.snow.css';

import { ThemeProvider } from "next-themes";
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from "next-auth/react";
import { LanguageProvider } from "@/store/language-context";
import { GlobalProgressBar } from "@/components/progress-bar/global-progress-bar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 400 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 400 900",
});

export const metadata: Metadata = {
  title: "Helpdesk",
  description: "Manage Ticket Operation",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >

          <Toaster />

          <SessionProvider>
            <LanguageProvider>
        <GlobalProgressBar />

              {children}
            </LanguageProvider>

          </SessionProvider>

        </ThemeProvider>
      </body>
    </html>
  );
}