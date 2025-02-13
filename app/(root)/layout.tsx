import { AppSidebar } from "@/components/app-sidebar"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import TeamSwitcher from "@/components/team-switcher"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { UserNav } from "@/components/user-nav"


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
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
                            <UserNav />
                        </div>
                    </div>
                </div>
                {children}
            </main>
        </SidebarProvider>
    )
}