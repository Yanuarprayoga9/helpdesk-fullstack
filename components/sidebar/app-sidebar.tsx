"use client"

import * as React from "react"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SIDEBAR_DATA } from "@/components/sidebar/sidebar-data"
import { useSession } from "next-auth/react"
import { UserType } from "@/@types/user"
import { TeamSwitcher } from "./console/team-switcher"
import { NavMain } from "./console/nav-main"
import { NavProjects } from "./console/nav-projects"
import { NavUser } from "./console/nav-user"
import { usePathname } from "next/navigation"
import { CONSOLE_ROUTE } from "@/constants/routes"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const isConsolePage = pathname.includes(CONSOLE_ROUTE)
  const session = useSession()
  const user = session.data?.user as UserType

  const userdata = {
    name: user?.name,
    email: user?.email,
    avatar: user?.imageUrl
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={SIDEBAR_DATA.teams} />
      </SidebarHeader>
      {
        isConsolePage ? (
          <SidebarContent>
            <NavMain items={SIDEBAR_DATA.console} />
            <NavProjects projects={SIDEBAR_DATA.projects} />
          </SidebarContent>
        ) : (
          <SidebarContent>
            <NavMain items={SIDEBAR_DATA.main} />
            <NavProjects projects={SIDEBAR_DATA.projects} />
          </SidebarContent>
        )
      }
      <SidebarFooter>
        <NavUser user={userdata} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
