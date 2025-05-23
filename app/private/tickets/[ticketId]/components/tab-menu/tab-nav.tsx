import React from 'react'
import { Code, Users, Settings, History } from "lucide-react"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useParams, useRouter } from 'next/navigation'
import { TICKETS_ROUTE } from '@/constants/routes'

interface TabeNavProps {
    TeamRegisteredCount?: number


}
export const TabNav = ({ TeamRegisteredCount }: TabeNavProps) => {
    const router = useRouter()
    const param = useParams()
    const ticketId = param.ticketId as string


    return (
        <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="detail" className="flex items-center gap-1" onClick={() => router.push(`${TICKETS_ROUTE}/${ticketId}/detail`)}>
                <Code className="h-4 w-4" />
                <span>Main</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-1" onClick={() => router.push(`${TICKETS_ROUTE}/${ticketId}/team`)}>
                <Users className="h-4 w-4" />
                <span>Team</span>
                <Badge variant="secondary" className="ml-1">
                    {TeamRegisteredCount}
                </Badge>
            </TabsTrigger>
            {/* <TabsTrigger value="issues" className="flex items-center gap-1">
                        <CircleDot className="h-4 w-4" />
                        <span>Issues</span>
                        <Badge variant="secondary" className="ml-1">
                            {issuesCount}
                        </Badge>
                    </TabsTrigger> */}
            <TabsTrigger value="ticket-created" className="flex items-center gap-1" onClick={() => router.push(`${TICKETS_ROUTE}/${ticketId}/history`)}>
                <History className="h-4 w-4" />
                <span>History</span>

            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1" onClick={() => router.push(`${TICKETS_ROUTE}/${ticketId}/assigment-request`)}>
                <Settings className="h-4 w-4" />
                <span>Assigment-request</span>
            </TabsTrigger>
        </TabsList>

    )
}

