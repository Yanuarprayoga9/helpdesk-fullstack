import { getCurrentUserRole } from '@/actions/user';
import { DEFAULT_ISLOGIN_REDIRECT } from '@/routes';
import { redirect } from 'next/navigation';
import React from 'react';

const Page = async () => {
    const userRole = await getCurrentUserRole();

    if ( userRole !== "ADMIN") {
        redirect(DEFAULT_ISLOGIN_REDIRECT);
    }

    return (
        <div>
            <h1>Welcome, Admin</h1>
        </div>
    );
}

export default Page;
