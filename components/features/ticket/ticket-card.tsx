"use client"
import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Loader } from '@/components/ui/loader'
import Link from 'next/link'
import { CONSOLE_TICKETS_ROUTE, TICKETS_ROUTE } from '@/constants/routes'

// Type definitions
interface TicketShowType {
  id: string
  title: string
  project: string
  createdBy: string
  createdAt: Date | string
  description: string
  category: string
  status: string
  priority: string
  priorityColor: string
  statusColor: string
}

interface ITicketCard {
  ticket: TicketShowType
  isConsole: boolean
  isGridView: boolean
}

const colorMap: Record<string, string> = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  orange: "bg-orange-500",
  gray: "bg-gray-500",
  purple: "bg-purple-500",
}

// Updated TicketCard component with improved layout
export function TicketCard({ ticket, isConsole, isGridView }: ITicketCard) {
  const [redirecting, setIsRedirecting] = useState<boolean>(false)

  const handleClick = () => {
    setIsRedirecting(true)
  }

  const priorityColor = colorMap[ticket.priorityColor] || "bg-gray-500"
  const statusColor = colorMap[ticket.statusColor] || "bg-gray-500"
  const priorityColorName = ticket.priorityColor || "gray"

  const formatDate = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  if (isGridView) {
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="p-4 space-y-4 h-full flex flex-col">
          {/* Header with title and priority */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold text-base line-clamp-2 leading-tight flex-1">
              {ticket.title}
            </h3>
            <Badge className={`${priorityColor} text-white text-xs px-2 py-1 rounded-md shrink-0`}>
              {ticket.priority}
            </Badge>
          </div>
          
          {/* Project name */}
          <div className="text-sm text-muted-foreground font-medium">
            {ticket.project}
          </div>
          
          {/* Creator and date */}
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="font-medium">{ticket.createdBy}</span>
            <span>•</span>
            <span>{formatDate(ticket.createdAt)}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
            {ticket.description}
          </p>
          
          {/* Category and status badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs px-2 py-1 rounded-md">
              {ticket.category}
            </Badge>
            <Badge 
              variant="secondary" 
              className={`text-xs px-2 py-1 rounded-md ${statusColor} text-white`}
            >
              {ticket.status}
            </Badge>
          </div>
          
          {/* Action button */}
          <div className="mt-auto pt-2">
            <Link
              href={`${isConsole ? CONSOLE_TICKETS_ROUTE : TICKETS_ROUTE}/${ticket.id}/detail`}
              onClick={handleClick}
              className={`w-full text-sm flex items-center justify-center gap-2 py-2.5 px-4 rounded-md transition-all duration-200 border ${
                redirecting 
                  ? "pointer-events-none text-muted-foreground bg-muted border-muted" 
                  : "text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200 hover:border-green-300"
              }`}
            >
              {redirecting ? (
                <>
                  <Loader color={priorityColorName} />
                  <span>Opening...</span>
                </>
              ) : (
                "Open Ticket"
              )}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // List view with improved layout
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-4">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            {/* Title, priority, and project */}
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h3 className="font-semibold text-lg">{ticket.title}</h3>
              <Badge className={`${priorityColor} text-white text-xs px-2 py-1 rounded-md`}>
                {ticket.priority}
              </Badge>
              <span className="text-muted-foreground font-medium">
                {ticket.project}
              </span>
            </div>

            {/* Creator and date */}
            <div className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
              <span className="font-medium">{ticket.createdBy}</span>
              <span>•</span>
              <span>{formatDate(ticket.createdAt)}</span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {ticket.description}
            </p>

            {/* Category and status badges */}
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="secondary" className="text-xs px-2 py-1 rounded-md">
                {ticket.category}
              </Badge>
              <Badge 
                variant="secondary" 
                className={`text-xs px-2 py-1 rounded-md ${statusColor} text-white`}
              >
                {ticket.status}
              </Badge>
            </div>
          </div>

          {/* Action button */}
          <div className="flex-shrink-0">
            <Link
              href={`${isConsole ? CONSOLE_TICKETS_ROUTE : TICKETS_ROUTE}/${ticket.id}/detail`}
              onClick={handleClick}
              className={`text-sm flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 border ${
                redirecting 
                  ? "pointer-events-none text-muted-foreground bg-muted border-muted" 
                  : "text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200 hover:border-green-300"
              }`}
            >
              {redirecting ? (
                <>
                  <Loader color={priorityColorName} />
                  <span>Opening...</span>
                </>
              ) : (
                "Open Ticket"
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}