export const dynamic = "force-dynamic";

import { getCurrentUser } from '@/actions/user'
import React from 'react'

export default async function ProfilePage() {
  const { user } = await getCurrentUser()
  return (
    <>
      <h1>{JSON.stringify(user)}</h1>
    </>
  )
}

