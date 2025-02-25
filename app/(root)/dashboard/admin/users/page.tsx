import { DataTable } from '@/components/data-table'
import React from 'react'
import { columns } from './components/columns'
import { getUsers } from '@/actions/users'

const page = async () => {
  const { users } = await getUsers()
  console.log(users)
  return (
    <div>
      <DataTable searchKey='id' columns={columns} data={users || []} />
    </div>
  )
}

export default page
