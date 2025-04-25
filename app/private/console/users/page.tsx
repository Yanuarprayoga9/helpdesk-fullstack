export const dynamic = "force-dynamic";

import { DataTable } from '@/components/data-table'
import React, { Suspense } from 'react'
import { columns } from './components/columns'
import { getUsers } from '@/actions/users'
import Loader from '@/components/loader';
import { ConsoleContainer } from '@/components/console-container';
import { ConsoleWrapper } from '@/components/console-wrapper';

const page = async () => {
  const { users } = await getUsers()
  return (
    <Suspense fallback={<Loader />}>
      <ConsoleContainer
        title="Projects"
        desc="Manage all your projects in one place. Organize tasks, track progress, and collaborate with your team efficiently."
      >

        <ConsoleWrapper
          title="Project List"
          desc="List of your projects"
          className=" lg:w-3/4"
        >

          <DataTable searchKey='id' columns={columns} data={users || []} />
        </ConsoleWrapper>
      </ConsoleContainer>



    </Suspense>
  )
}

export default page
