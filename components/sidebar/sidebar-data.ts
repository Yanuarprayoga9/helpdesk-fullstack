import {
 
  FileText,
  FolderKanban,

  HelpCircle,
  LayoutDashboard,
  
  Ticket,
  User2,
  Users,
} from "lucide-react"

import {
  CONSOLE_CATEGORIES_ROUTE,
  CONSOLE_PROJECTS_ROUTE,
  CONSOLE_TICKETS_ROUTE,
  CONSOLE_USERS_ROUTE,
  PROJECTS_ROUTE,
  TICKETS_ROUTE,
} from "../../constants/routes"

// ========== Sidebar Navigation: Console ==========
const CONSOLE_NAV = [
  {
    title: "Projects",
    url: CONSOLE_PROJECTS_ROUTE,
    icon: LayoutDashboard, // Lebih representatif untuk overview
  },
  {
    title: "Tickets",
    url: TICKETS_ROUTE,
    icon: Ticket, // Icon ticket
  },
  {
    title: "Categories",
    url: CONSOLE_CATEGORIES_ROUTE,
    icon: FolderKanban, // Representasi kategori
  },
  {
    title: "Users",
    url: CONSOLE_USERS_ROUTE,
    icon: Users, // Ikon user list
  },
  {
    title: "Test",
    url: CONSOLE_TICKETS_ROUTE,
    icon: HelpCircle,
    isActive: true,
    items: [
      {
        title: "My Tickets",
        url: CONSOLE_TICKETS_ROUTE,
      },
      {
        title: "Assign",
        url: "#",
      },
    ],
  },
]

// ========== Sidebar Navigation: Main ==========
const MAIN_NAV = [
  {
    title: "Tickets",
    url: TICKETS_ROUTE,
    icon: Ticket,
  },
  {
    title: "Projects",
    url: PROJECTS_ROUTE,
    icon: LayoutDashboard,
  },
]


// ========== Sidebar Menu Data ==========
export const SIDEBAR_DATA = {
  console: CONSOLE_NAV,
  main: MAIN_NAV,
  projects: [
    {
      name: "Profile",
      url: "/private/profile/edit",
      icon: User2, // default frame icon
    },
    {
      name: "Guideline",
      url: "/private/guideline",
      icon: FileText, // lebih cocok untuk dokumentasi
    },
  ],
}
