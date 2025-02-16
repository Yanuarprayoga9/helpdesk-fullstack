import { Calendar, ChevronDown, ChevronUp, Home, HomeIcon, Inbox, PanelLeft, Plus, Search, Settings, Shield, User2 } from "lucide-react"

export enum Role {
    Developer = 'Developer',
    DevOps = 'DevOps',
    Admin = 'Admin',
    Manager = 'Manager'
}
export type RoleList = Role[];
export enum Category {
    BugSistem = 'Bug Sistem',
    GangguanInfrastruktur = 'Gangguan Infrastruktur',
    PermintaanDeployment = 'Permintaan Deployment',
    PermintaanPerubahan = 'Permintaan Perubahan'
}

export enum TicketStatus {
    Open = 'Open',
    InProgress = 'InProgress',
    Escalated = 'Escalated',
    Resolved = 'Resolved',
    Reopened = 'Reopened',
    Closed = 'Closed',
    OnHold = 'OnHold'
}


export const SIDEBAR_ITEMS  = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]