import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SessionProvider } from "next-auth/react"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { getCurrentUser } from "@/actions/user"
import AppNavbar from "@/components/navbar/app-navbar"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from 'react-hot-toast';

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

export default async function Layout({ children }: { children: React.ReactNode }) {
    const { user } = await getCurrentUser();

    if (!user?.id) {
        const headersList = await headers(); // Await untuk mendapatkan headers
        const currentPath = headersList.get("next-url") || "/";
        redirect(`/login?callbackUrl=${encodeURIComponent(currentPath)}`);
    }

    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >

                    <Toaster />

                    <SessionProvider>
                        <SidebarProvider>
                            <AppSidebar />
                            <SidebarInset>
                                <AppNavbar user={user} />
                                <main className="w-full max-w-full ">
                                    <div className="mx-4 flex flex-col pt-0 justify-center  md:p-4 md:mx-4 max-w-full md:max-w-7xl  md:my-5 rounded-md ">
                                        {children}
                                    </div>
                                </main>
                            </SidebarInset>
                        </SidebarProvider>
                    </SessionProvider>
                </ThemeProvider>

            </body>
        </html>
    );
}
