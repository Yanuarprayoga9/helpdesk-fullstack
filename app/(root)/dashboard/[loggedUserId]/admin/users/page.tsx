import { DataTable } from '@/components/data-table'
import React from 'react'
import { columns } from './components/columns'
import { getUsers } from '@/actions/users'
import { PageHeader } from '@/components/header'

const page = async () => {
  const { users } = await getUsers()
  return (
    <div className='w-96'>
      <PageHeader title='user' desc='category page' />
      <DataTable searchKey='id' columns={columns} data={users || []} />
    </div>
  )
}

export default page
