"use client"

import * as React from "react"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SIDEBAR_DATA } from "@/constants/common-sidebar-data"
import { useSession } from "next-auth/react"
import { UserType } from "@/@types/user"
import { TeamSwitcher } from "./console/team-switcher"
import { NavMain } from "./console/nav-main"
import { NavProjects } from "./console/nav-projects"
import { NavUser } from "./console/nav-user"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const session = useSession()
  const user = session.data?.user as UserType
  
  const userdata = {
    name: user?.name,
    email:user?.email,
    avatar:user?.imageUrl
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={SIDEBAR_DATA.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={SIDEBAR_DATA.navMain} />
        <NavProjects projects={SIDEBAR_DATA.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userdata} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
