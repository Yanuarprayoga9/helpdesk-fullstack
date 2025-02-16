import React from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import { BreadcrumbDemo } from './navbar-bread-cumb'
import Notification from './navbar-notification'
import { UserNav } from './navbar-user-nav'
interface AppNavbarProps {
    user?: any;
    roles?: string[] | undefined | null
}
const AppNavbar: React.FC<AppNavbarProps> = ({ user, roles }) => {
    return (
        <div className=" border-b">
            <div className=" flex h-16  items-center px-4">
                <SidebarTrigger />
                <BreadcrumbDemo />
                {/* <div className="hidden md:block"><Search /></div> */}
                {/* <MainNav className="mx-6" /> */}
                <div className="ml-auto flex items-center space-x-4">
                    <Notification />
                    <UserNav user={user} roles={roles || []} />
                </div>
            </div>
        </div>
    )
}

export default AppNavbar
