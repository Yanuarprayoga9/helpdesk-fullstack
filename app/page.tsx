export const dynamic = "force-dynamic";

import { getCurrentUser } from '@/@data/user';
import React from 'react'

const page = async () => {
  const session = await getCurrentUser()
  const isAuthenticated = !!session.user?.id;

  return (
    <div>
      {
        isAuthenticated ? JSON.stringify(session.user) : "not logged in"
      }
    </div>
  )
}

export default page
