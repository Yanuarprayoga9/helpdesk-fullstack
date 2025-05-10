"use client"
import React from 'react'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { CONSOLE_ROUTE, DEFAULT_ISLOGIN_REDIRECT_ROUTE } from '@/constants/routes'
import Link from 'next/link'

export const ConsoleButton = () => {
    const pathname = usePathname()
    const isConsole = pathname.includes("console")

    const text = !isConsole ? "redirect console" : "redirect main"

    return (
        <Link href={!isConsole ? CONSOLE_ROUTE : DEFAULT_ISLOGIN_REDIRECT_ROUTE
        } > <Button className="bg-green-500 flex-1 text-sm sm:flex-none" variant={'outline'}>{text}</Button></Link>
    )
}

