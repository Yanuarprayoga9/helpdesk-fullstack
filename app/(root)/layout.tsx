import { getCurrentUserRole } from "@/actions/user"
import { auth } from "@/auth"
import { SidebarProvider } from "@/components/ui/sidebar"
import AppNavbar from "@/components/navbar/app-navbar"
import { SessionProvider } from "next-auth/react"
import { AppSidebar } from "@/components/sidebar/app-sidebar"


export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    const roles = await getCurrentUserRole()

    return (
        <SessionProvider>

            <SidebarProvider>
                <AppSidebar />
                <main className="w-full   ">
                    <AppNavbar user={session?.user} roles={roles} />
                    <div className="md:p-4 md:mx-4 md:my-5 rounded-md bg-[#F9F9FA]">
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </SessionProvider>
    )
}