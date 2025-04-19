export const dynamic = "force-dynamic";

// import { getUsers } from '@/actions/users';
import Loader from '@/components/loader';
import Link from 'next/link';
import React, { Suspense } from 'react';


const Page = async () => {
    // const users = await getUsers()
    return (
        <Suspense fallback={<Loader />}>
            <div>
                <Link href={"/dashboard"}>tes</Link>

                <h1>Welcome, Admin</h1>
            </div>
        </Suspense>
    );
}

export default Page;
