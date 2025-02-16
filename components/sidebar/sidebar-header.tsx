import React from 'react'
import { SidebarHeader } from '../ui/sidebar'

const SidebarHeaderComponent = () => {
    return (
        <SidebarHeader className="w-full text-2xl flex justify-center items-center font-semibold">
            <span className="mt-2 text-[#7F56D8]">Helpdesk<span className="mt-2 text-[#3e325a]  text-muted-foreground">Devops</span></span>
        </SidebarHeader>
    )
}

export default SidebarHeaderComponent
