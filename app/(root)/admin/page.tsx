import { getCurrentUserRole } from '@/actions/user';
import { Role } from '@/constants';
import { DEFAULT_ISLOGIN_REDIRECT } from '@/routes';
import { redirect } from 'next/navigation';
import React from 'react';

const Page = async () => {
    const userRole = await getCurrentUserRole();
    let isAdmin = false
    if (!userRole) return redirect(DEFAULT_ISLOGIN_REDIRECT);

    userRole?.map((role) => {
        console.log(role)
        if (role == Role.Admin) {
            isAdmin = true
        }
    })
    if (isAdmin == false) return redirect(DEFAULT_ISLOGIN_REDIRECT);


    return (
        <div>
            <h1>Welcome, Admin</h1>
        </div>
    );
}

export default Page;
