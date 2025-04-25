import { getCurrentUser } from "@/actions/user";
import AppNavbar from "@/components/navbar/app-navbar";
import { SessionProvider } from "next-auth/react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const { user } = await getCurrentUser();
  
    const cookieStore =await  cookies(); // ✅ Tidak perlu await
    const currentPath = cookieStore.get("next-url")?.value || "/";
    const isConsole = currentPath.includes("/console");
  
    if (!user?.id) {
      redirect(`/login?callbackUrl=${encodeURIComponent(currentPath)}`);
    }
  
    return (
      <SessionProvider>
        {!isConsole && <AppNavbar user={user} />}
        {children}
      </SessionProvider>
    );
  }