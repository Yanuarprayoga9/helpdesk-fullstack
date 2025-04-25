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

export const PRIVATE_ROUTE = "/private";

export const SIDEBAR_ROUTES = {
  Tickets: `${PRIVATE_ROUTE}/tickets`,
  Categories: `${PRIVATE_ROUTE}/categories`,
  Users: `${PRIVATE_ROUTE}/users`,
} as const;

function sidebarUser (name:string,email:string,avatar:string) {
  return {
    SIDEBAR_USER  :  {
      name,
      email,
      avatar,
    }
  }
}
export const SIDEBAR_TEAMS  =[
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
      title: "Tickets",
      url: SIDEBAR_ROUTES.Tickets,
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "my tickets",
          url: "#",
        },
        {
          title: "Assign",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
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