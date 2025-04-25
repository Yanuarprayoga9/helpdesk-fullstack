import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { getCurrentUser } from "@/actions/user"
import AppNavbar from "@/components/navbar/app-navbar";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const { user } = await getCurrentUser();

    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <AppNavbar user={user} isNavConsole={true}/>
                        {children}
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}