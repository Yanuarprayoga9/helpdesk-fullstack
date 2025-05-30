"use client"

import * as React from "react"
import { ChevronsUpDown, LayoutDashboard, Home } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { CONSOLE_ROUTE, DEFAULT_ISLOGIN_REDIRECT_ROUTE } from "@/constants/routes"

export function ConsoleSwitcher() {
  const { isMobile } = useSidebar()
  const pathname = usePathname()
  const router = useRouter()

  const isConsole = pathname.includes("console")

  const destinations = [
    {
      name: "Main App",
      icon: Home,
      href: DEFAULT_ISLOGIN_REDIRECT_ROUTE,
    },
    {
      name: "Console",
      icon: LayoutDashboard,
      href: CONSOLE_ROUTE,
    },
  ]

  const active = isConsole ? destinations[1] : destinations[0]

  const handleSwitch = (href: string) => {
    router.push(href)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <active.icon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{active.name}</span>
                <span className="truncate text-xs">{isConsole ? "Console Panel" : "Main Application"}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Switch Mode
            </DropdownMenuLabel>
            {destinations.map((dest) => (
              <DropdownMenuItem
                key={dest.name}
                onClick={() => handleSwitch(dest.href)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <dest.icon className="size-4 shrink-0" />
                </div>
                {dest.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
