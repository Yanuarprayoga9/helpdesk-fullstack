"use client"
import React from 'react'
import { SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { SIDEBAR_ITEMS } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MainContentSidebar = () => {
    const pathname = usePathname();
    console.log(pathname === SIDEBAR_ITEMS[0].url)
    return (
        <SidebarGroupContent>
            <SidebarMenu>
                {SIDEBAR_ITEMS.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        {pathname == item.url ? (
                            <SidebarMenuButton asChild isActive>
                                <Link href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        ) : (

                            <SidebarMenuButton asChild >
                                <Link href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        )}
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroupContent>
    )
}

export default MainContentSidebar
