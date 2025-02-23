"use client"

import * as React from "react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavProjects } from "@/components/sidebar/nav-projects"
import { NavUser } from "@/components/sidebar/nav-user"
import { TeamSwitcher } from "@/components/sidebar/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SIDEBAR_DATA } from "@/constants"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavUser user={SIDEBAR_DATA.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
