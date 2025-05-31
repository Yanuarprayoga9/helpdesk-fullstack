"use client"
import type { TicketShowType } from "@/@types/ticket"
import { Badge } from "@/components/ui/badge"
import {Loader} from "@/components/ui/loader"
import { CONSOLE_TICKETS_ROUTE, TICKETS_ROUTE } from "@/constants/routes"
import { format } from "date-fns"
import Link from "next/link"
import { useState } from "react"

interface ITicketCard {
  ticket: TicketShowType
  isConsole: boolean
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

export function TicketCard({ ticket, isConsole }: ITicketCard) {
  const [redirecting, setIsRedirecting] = useState(false)

  const handleClick = () => {
    setIsRedirecting(true)
  }

  const priorityColor = colorMap[ticket.priorityColor] || "bg-gray-500"
  const statusColor = colorMap[ticket.statusColor] || "bg-gray-500"

  // Extract color name without "bg-" prefix and without "-500" suffix
  const priorityColorName = ticket.priorityColor || "gray"

  return (
    <div className="rounded-lg border bg-card p-4 text-card-foreground cursor-pointer">
      <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
        <div className="flex items-start gap-3 w-full">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-medium text-xl">{ticket.title}</h3>
              <Badge className={`rounded-sm ${priorityColor}`}>{ticket.priority}</Badge>
              <p className="text-xl text-muted-foreground">{ticket.project}</p>
            </div>

            <div className="text-xs flex items-center gap-2">
              <span className="text-muted-foreground">{ticket.createdBy}</span>-
              <span className="text-muted-foreground">{format(ticket.createdAt, "MMM d, yyyy")}</span>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">{ticket.description}</p>
            <div className="mt-4 flex items-center gap-4 flex-wrap">
              <Badge variant="secondary" className="rounded-sm">
                category: {ticket.category}
              </Badge>
              <Badge variant="secondary" className={`rounded-sm ${statusColor}`}>
                status: {ticket.status}
              </Badge>
            </div>
          </div>
        </div>
        <Link
          href={`${isConsole ? CONSOLE_TICKETS_ROUTE : TICKETS_ROUTE}/${ticket.id}/detail`}
          onClick={handleClick}
          className={`ml-auto text-sm flex items-center gap-2 transition-all ${redirecting ? "pointer-events-none text-muted-foreground" : "text-green-500 hover:text-green-600"}`}
        >
          {redirecting ? (
            <>
              <Loader  color={priorityColorName} />
              <span>Opening...</span>
            </>
          ) : (
            "Open Ticket"
          )}
        </Link>
      </div>
    </div>
  )
}
