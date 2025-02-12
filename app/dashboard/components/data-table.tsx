"use client"
import { currentUser } from '@/actions/user'
import prisma from '@/lib/db'
import { User } from '@prisma/client'
import { Session } from 'next-auth'
import React from 'react'
interface DataTableProps {
    user: Session
}
export const DataTable: React.FC<DataTableProps> =  ({ user }) => {
    console.log('this is client component', { user })
    return (
        <div>
            {JSON.stringify(user)}
        </div>
    )
}

