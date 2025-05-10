import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import { CONSOLE_CATEGORIES_ROUTE, CONSOLE_PROJECTS_ROUTE, CONSOLE_TICKETS_ROUTE, CONSOLE_USERS_ROUTE, TICKETS_ROUTE } from "../../constants/routes";

export const PRIVATE_ROUTE = "/private";

export const SIDEBAR_ROUTES = {
  Tickets: `${PRIVATE_ROUTE}/tickets`,
  Categories: `${PRIVATE_ROUTE}/categories`,
  Users: `${PRIVATE_ROUTE}/users`,
} as const;

function sidebarUser(name: string, email: string, avatar: string) {
  return {
    SIDEBAR_USER: {
      name,
      email,
      avatar,
    }
  }
}
export const SIDEBAR_TEAMS = [
  {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  {
    name: "Acme Corp.",
    logo: AudioWaveform,
    plan: "Startup",
  },
  {
    name: "Evil Corp.",
    logo: Command,
    plan: "Free",
  },
]
// This is sample data.
export const SIDEBAR_DATA = {
  teams: SIDEBAR_TEAMS,
  navMain: [
    {
      title: "Projects",
      url: CONSOLE_PROJECTS_ROUTE,
      icon: Bot,

    },
    {
      title: "Tickets",
      url: CONSOLE_TICKETS_ROUTE,
      icon: SquareTerminal,
    },
    {
      title: "Categories",
      url: CONSOLE_CATEGORIES_ROUTE,
      icon: BookOpen,
    },
    {
      title: "Users",
      url: CONSOLE_USERS_ROUTE,
      icon: Settings2,

    }, {
      title: "Test",
      url: CONSOLE_TICKETS_ROUTE,
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "my tickets",
          url: CONSOLE_TICKETS_ROUTE,
        },
        {
          title: "Assign",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}