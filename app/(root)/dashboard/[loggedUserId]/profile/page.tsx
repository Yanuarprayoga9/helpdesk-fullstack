import React from 'react'
type PageParams = {
  params: Promise<{ loggedUserId: string }>;
};

export default async function ProfilePage({ params }:PageParams) {
  const { loggedUserId } = await params; // Awaiting the params Promise

  return (
    <>
    <h1>{loggedUserId}</h1>
    </>
  )
}

