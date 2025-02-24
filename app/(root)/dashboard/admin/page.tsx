
// import { getUsers } from '@/actions/users';
import Link from 'next/link';
import React from 'react';


const Page = async () => {
    // const users = await getUsers()
    return (
        <div>
                  <Link href={"/dashboard"}>tes</Link>

            <h1>Welcome, Admin</h1>
        </div>
    );
}

export default Page;
