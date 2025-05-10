import { getCurrentUser } from "@/actions/user";
import AppNavbar from "@/components/navbar/app-navbar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const { user } = await getCurrentUser();
  
    const cookieStore =await  cookies(); // ✅ Tidak perlu await
    const currentPath = cookieStore.get("next-url")?.value || "/";
  
    if (!user?.id) {
      redirect(`/login?callbackUrl=${encodeURIComponent(currentPath)}`);
    }
  
    return (
      <>
              <SidebarProvider >
                  <AppSidebar />
                  <SidebarInset>
          
                        <AppNavbar user={user}/>
                          {children}
                     
                  </SidebarInset>
              </SidebarProvider>
          </>
    );
  }

