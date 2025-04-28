"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import AppNavbar from './app-navbar'
import { UserType } from '@/@types/user'
import { CONSOLE_ROUTE } from '@/constants/routes'

export const NavbarWrapper = ({ user }: { user: UserType | undefined }) => {
    const pathname = usePathname()
    const isConsole = pathname.includes(CONSOLE_ROUTE)

    return (
        <>{!isConsole && user?.id && <AppNavbar user={user} />}
        </>
    )
}

