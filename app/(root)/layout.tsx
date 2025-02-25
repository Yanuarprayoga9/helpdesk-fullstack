import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SessionProvider } from "next-auth/react"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { getCurrentUser } from "@/actions/user"
import AppNavbar from "@/components/navbar/app-navbar"


export default async function Layout({ children }: { children: React.ReactNode }) {
    const { user } = await getCurrentUser()
    return (
        <SessionProvider>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <AppNavbar user={user} />
                    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <div className="md:p-4 md:mx-4 md:my-5 rounded-md ">
                            {children}
                        </div>
                    </main>
                </SidebarInset>

            </SidebarProvider>
        </SessionProvider>
    )
}