export const dynamic = "force-dynamic";

import { DataTable } from '@/components/data-table'
import React, { Suspense } from 'react'
import { columns } from './components/columns'
import { getUsers } from '@/@data/users'
import Loader from '@/components/loader';
import { ConsoleContainer } from '@/components/layouts/console-container';
import { ConsoleWrapper } from '@/components/layouts/console-wrapper';
import { UserForm } from './components/user-form';
import { mapAndSort } from '@/lib/utils';
import { getRoles } from '@/@data/role';

const page = async () => {
  const { users } = await getUsers();
  const {roles} = await getRoles()

  const rolesOptions = mapAndSort(roles, user => user.name, user => user.id);
  
  return (
    <Suspense fallback={<Loader />}>
      <ConsoleContainer
        title="Users"
        desc="Manage and monitor your application users efficiently. View, search, and organize user data."
      >
        <ConsoleWrapper
          title="User List"
          desc="Browse and manage all registered users"
          className="lg:w-8/12"
        >
          <DataTable searchKey='name' columns={columns} data={users || []} />
        </ConsoleWrapper>
        <ConsoleWrapper
         
          className="lg:w-1/4"
        >
          <UserForm rolesOptions={rolesOptions}/>
        </ConsoleWrapper>
      </ConsoleContainer>
    </Suspense>
  )
}

export default page;
