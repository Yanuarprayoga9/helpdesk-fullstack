import { getCurrentUserRole } from "@/actions/user"
import { auth } from "@/auth"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import AppNavbar from "@/components/navbar/app-navbar"
import { SessionProvider } from "next-auth/react"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { Separator } from "@radix-ui/react-separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import AppNavbar from "@/components/navbar/app-navbar"


export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    const roles = await getCurrentUserRole()

    return (
        <SessionProvider>

            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <AppNavbar user={session?.user} roles={roles} />
                    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <div className="bg-red-200 md:p-4 md:mx-4 md:my-5 rounded-md ">
                            {children}
                        </div>
                    </main>
                </SidebarInset>

            </SidebarProvider>
        </SessionProvider>
    )
}