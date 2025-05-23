export const dynamic = "force-dynamic";

import { DataTable } from '@/components/data-table'
import React, { Suspense } from 'react'
import { columns } from './components/columns'
import { getUsers } from '@/@data/users'
import Loader from '@/components/loader';
import { ConsoleContainer } from '@/components/layouts/console-container';
import { ConsoleWrapper } from '@/components/layouts/console-wrapper';

const page = async () => {
  const { users } = await getUsers();

  return (
    <Suspense fallback={<Loader />}>
      <ConsoleContainer
        title="Users"
        desc="Manage and monitor your application users efficiently. View, search, and organize user data."
      >
        <ConsoleWrapper
          title="User List"
          desc="Browse and manage all registered users"
          className="lg:w-3/4"
        >
          <DataTable searchKey='id' columns={columns} data={users || []} />
        </ConsoleWrapper>
      </ConsoleContainer>
    </Suspense>
  )
}

export default page;
