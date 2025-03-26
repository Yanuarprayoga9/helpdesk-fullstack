import React from 'react'
import { Code, Users, Settings } from "lucide-react"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface TabeNavProps {
    TeamRegisteredCount?: number

}
export const TabNav = ({ TeamRegisteredCount }: TabeNavProps) => {

    
    return (
        <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="code" className="flex items-center gap-1">
                <Code className="h-4 w-4" />
                <span>Code</span>
            </TabsTrigger>
            {/* <TabsTrigger value="issues" className="flex items-center gap-1">
                        <CircleDot className="h-4 w-4" />
                        <span>Issues</span>
                        <Badge variant="secondary" className="ml-1">
                            {issuesCount}
                        </Badge>
                    </TabsTrigger> */}
            {/* <TabsTrigger value="ticket-created" className="flex items-center gap-1">
                        <GitPullRequest className="h-4 w-4" />
                        <span>Pull Requests</span>
                        <Badge variant="secondary" className="ml-1">
                            {ticketCreatedCount}
                        </Badge>
                    </TabsTrigger> */}
            <TabsTrigger value="team" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Team</span>
                <Badge variant="secondary" className="ml-1">
                    {TeamRegisteredCount}
                </Badge>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
            </TabsTrigger>
        </TabsList>

    )
}

