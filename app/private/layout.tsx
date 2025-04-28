import { getCurrentUser } from "@/actions/user";
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
        {children}
      </>
    );
  }