import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import { CONSOLE_CATEGORIES_ROUTE, CONSOLE_PROJECTS_ROUTE, CONSOLE_TICKETS_ROUTE, CONSOLE_USERS_ROUTE, TICKETS_ROUTE } from "../../constants/routes";

const CONSOLE_NAV = [
    {
      title: "Projects",
      url: CONSOLE_PROJECTS_ROUTE,
      icon: Bot,

    },
    {
      title: "Tickets",
      url: TICKETS_ROUTE,
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
  ]
const MAIN_NAV = [
  {
      title: "Tickets",
      url: TICKETS_ROUTE,
      icon: SquareTerminal,
    },
    {
      title: "Projects",
      url: CONSOLE_PROJECTS_ROUTE,
      icon: Bot,

    },

    
  ]
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
  console: CONSOLE_NAV,
  main:MAIN_NAV,
  projects: [
    {
      name: "Profile",
      url: "/private/profile/edit",
      icon: Frame,
    },
    {
      name: "Guideline",
      url: "/private/guideline",
      icon: PieChart,
    },
    
  ],
}
