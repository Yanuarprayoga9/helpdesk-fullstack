export const dynamic = "force-dynamic";

import { DataTable } from '@/components/data-table'
import React from 'react'
import { columns } from './components/columns'
import { getUsers } from '@/actions/users'
import { Header } from '@/components/header'

const page = async () => {
  const { users } = await getUsers()
  return (
    <div className='w-full'>
      <Header title="Categories" desc="Manage and organize categories efficiently." />
      <DataTable searchKey='id' columns={columns} data={users || []} />
    </div>
  )
}

export default page
