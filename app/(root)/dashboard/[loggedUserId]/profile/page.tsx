import React from 'react'

export default function ProfilePage({ params }: { params: { loggedInUserId: string } }) {
  return (
    <>
    <h1>{params.loggedInUserId}</h1>
    </>
  )
}

