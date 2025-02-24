import React from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import { BreadcrumbDemo } from './navbar-bread-cumb'
import Notification from './navbar-notification'
import { Separator } from '../ui/separator'
import { ModeToggle } from '../theme-toggle'
import { UserType } from '@/@types/user'
interface AppNavbarProps {
    user?: UserType;
    roles?: string[] | undefined | null
}
const AppNavbar: React.FC<AppNavbarProps> = () => {
    return (
        <header className="flex justify-between px-6 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger />
                <Separator orientation="vertical" className="h-4" />
                <BreadcrumbDemo />


            </div>
            <div className="ml-auto flex items-center space-x-4">
                <ModeToggle />
                <Notification />
                {/* <UserNav user={user} roles={roles || []} /> */}
            </div>
        </header>
    )
}

export default AppNavbar
