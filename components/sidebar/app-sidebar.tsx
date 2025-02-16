
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    
} from "@/components/ui/sidebar"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

import MainContentSidebar from "./sidebar-content-main"
import { ChevronUp, Shield, User2 } from "lucide-react"
import SidebarSearchComponent from "./sidebar-search"
import SidebarHeaderComponent from "./sidebar-header"

export function AppSidebar() {

    return (
        <Sidebar className="">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarHeaderComponent />
                    <SidebarSearchComponent />
                    <MainContentSidebar />
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem className="">
                                <SidebarGroupLabel>
                                    <Shield fill="" className="mr-2 " />
                                    <span className="text-base font-[450]  transition-colors ">Admin</span>
                                </SidebarGroupLabel>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                        <Link href="/dashboard/admin/users">Users</Link>
                                        {/* <SidebarMenuSubButton> */}
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton />
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> Username
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    <span>Account</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Billing</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
