
import { getCurrentUser } from '@/actions/user';
import { Role } from '@/constants/enums';
import { redirect } from 'next/navigation';


interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
    const fetchuser = await getCurrentUser()
    if (fetchuser.user?.role.name !== Role.Admin) {
        redirect("/tickets")
    }

    return <>{children}</>;
};

export default Layout;
