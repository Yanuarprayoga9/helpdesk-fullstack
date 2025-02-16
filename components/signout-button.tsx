"use client"
import { logout } from '@/actions/logout'
import React from 'react'
import { Button } from './ui/button'

const SignOutButton = () => {
    const handleSignOut = () => {
            logout()
        }
  return (
    <Button variant={"ghost"} onClick={handleSignOut}>
      Sign Out
    </Button>
  )
}

export default SignOutButton
