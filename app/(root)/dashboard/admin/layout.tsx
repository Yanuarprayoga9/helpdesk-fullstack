import { getCurrentUserRole } from '@/actions/user';
import { Role } from '@/constants';
import { DEFAULT_ISLOGIN_REDIRECT } from '@/routes';
import { redirect } from 'next/navigation';
import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
    const userRole = await getCurrentUserRole();
    console.log({userRole})

    if (!userRole?.some(role => role === Role.Admin)) {
        return redirect(DEFAULT_ISLOGIN_REDIRECT);
    }

    return <>{children}</>;
};

export default Layout;
