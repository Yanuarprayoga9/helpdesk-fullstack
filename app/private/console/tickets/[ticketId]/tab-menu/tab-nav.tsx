"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader } from "@/components/ui/loader"
import { Code, Users, History, Settings } from "lucide-react"
import { TICKETS_ROUTE } from '@/constants/routes'

interface TabeNavProps {
  TeamRegisteredCount?: number
}

export const TabNav = ({ TeamRegisteredCount }: TabeNavProps) => {
  const param = useParams()
  const ticketId = param.ticketId as string
  const [redirectingTab, setRedirectingTab] = useState<string | null>(null)

  const tabs = [
    {
      key: "detail",
      label: "Main",
      icon: <Code className="h-4 w-4" />,
      url: `${TICKETS_ROUTE}/${ticketId}/detail`,
    },
    {
      key: "team",
      label: "Team",
      icon: <Users className="h-4 w-4" />,
      url: `${TICKETS_ROUTE}/${ticketId}/team`,
      badge: TeamRegisteredCount,
    },
    {
      key: "history",
      label: "History",
      icon: <History className="h-4 w-4" />,
      url: `${TICKETS_ROUTE}/${ticketId}/history`,
    },
    {
      key: "assignment-request",
      label: "Assignment-request",
      icon: <Settings className="h-4 w-4" />,
      url: `${TICKETS_ROUTE}/${ticketId}/assignment-request`,
    },
  ]

  return (
    <TabsList className="grid grid-cols-5 w-full max-w-2xl">
      {tabs.map(({ key, label, icon, url, badge }) => (
        <Link
          key={key}
          href={url}
          onClick={() => setRedirectingTab(key)}
          className="w-full"
        >
          <TabsTrigger
            value={key}
            className="flex items-center gap-1 w-full justify-center"
            disabled={redirectingTab === key}
          >
            {icon}
            {redirectingTab === key ? (
              <>
                <Loader  />
                <span>Opening...</span>
              </>
            ) : (
              <>
                <span>{label}</span>
                {badge !== undefined && (
                  <Badge variant="secondary" className="ml-1">
                    {badge}
                  </Badge>
                )}
              </>
            )}
          </TabsTrigger>
        </Link>
      ))}
    </TabsList>
  )
}
