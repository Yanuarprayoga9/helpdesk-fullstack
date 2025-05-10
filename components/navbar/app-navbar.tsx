"use client"
import React from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import { NavbarBreadCumb } from './navbar-bread-cumb'
import Notification from './navbar-notification'
import { Separator } from '../ui/separator'
import { ModeToggle } from '../theme-toggle'
import { UserType } from '@/@types/user'
import { UserNav } from './navbar-user-nav'
import { ConsoleButton } from '../console-button'
interface AppNavbarProps {
    user?: UserType;

}
const AppNavbar: React.FC<AppNavbarProps> = ({ user }) => {

    return (
        <header className="sticky mx-1 top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">

            <div className="flex py-4">
                <div className="flex items-center gap-2 px-4">
                    (<SidebarTrigger />)
                    
                    <Separator orientation="vertical" className="h-4" />
                    <NavbarBreadCumb />
                </div>
                <div className="ml-auto flex items-center space-x-4">
                    {user?.id  ? <ConsoleButton /> : null}
                    <ModeToggle />
                    <Notification />
                    <UserNav user={user} />
                </div>
            </div>
        </header>
    )
}

export default AppNavbar
