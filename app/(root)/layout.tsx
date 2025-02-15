import { getCurrentUser } from "@/actions/user"
import { auth } from "@/auth"
import { AppSidebar } from "@/components/app-sidebar"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import TeamSwitcher from "@/components/team-switcher"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { UserNav } from "@/components/user-nav"
import { SessionProvider } from "next-auth/react"


export default async function Layout({ children }: { children: React.ReactNode }) {
    const user =await  auth()
    console.log({user},"in layout")
    return (
        <SessionProvider>

            <SidebarProvider>
                <AppSidebar />
                <main className="w-full">
                    <div className=" border-b">
                        <div className=" flex h-16 items-center px-4">
                            <SidebarTrigger />
                            <TeamSwitcher />

                            <MainNav className="mx-6" />
                            <div className="ml-auto flex items-center space-x-4">
                                <Search />
                                <UserNav user={user}/>
                            </div>
                        </div>
                    </div>
                    {children}
                </main>
            </SidebarProvider>
        </SessionProvider>
    )
}