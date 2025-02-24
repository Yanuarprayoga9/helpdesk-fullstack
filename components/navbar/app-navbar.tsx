import React from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import { NavbarBreadCumb } from './navbar-bread-cumb'
import Notification from './navbar-notification'
import { Separator } from '../ui/separator'
import { ModeToggle } from '../theme-toggle'
import { UserType } from '@/@types/user'
import { UserNav } from './navbar-user-nav'
interface AppNavbarProps {
    user?: UserType;

}
const AppNavbar: React.FC<AppNavbarProps> = ({ user }) => {
    return (
        <header className="flex justify-between px-6 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger />
                <Separator orientation="vertical" className="h-4" />
                <NavbarBreadCumb />
            </div>
            <div className="ml-auto flex items-center space-x-4">
                <ModeToggle />
                <Notification />
                <UserNav user={user} />
            </div>
        </header>
    )
}

export default AppNavbar
