"use client"
import { TicketShowType } from "@/@types/ticket"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CONSOLE_ROUTE, CONSOLE_TICKETS_ROUTE, TICKETS_ROUTE } from "@/constants/routes"
import { format } from "date-fns"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface ITicketCard {
  ticket: TicketShowType
}
const colorMap: Record<string, string> = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  orange: "bg-orange-500",
  gray: "bg-gray-500",
  purple: "bg-purple-500",
};

export function TicketCard({ ticket }: ITicketCard) {
  const pathname = usePathname()

  const isConsole = pathname.includes(CONSOLE_ROUTE)

  const priorityColor = colorMap[ticket.priorityColor] || "bg-gray-500";
  const statusColor = colorMap[ticket.statusColor] || "bg-gray-500";

  return (
    <div className="rounded-lg border bg-card p-4 text-card-foreground  cursor-pointer">
      <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
        <div className="flex items-start gap-3 w-full">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              {/* <div className={`mt-1.5 h-4 w-4 rounded-full ${priorityColor} flex-shrink-0`} /> */}
              <h3 className="font-medium text-xl">{ticket.title}</h3>
              <Badge className={`rounded-sm ${priorityColor}`}>
                {ticket.priority}
              </Badge>
              <p className="text-xl text-muted-foreground">{ticket.project}</p>
            </div>

            <div className="text-xs flex items-center gap-2">
              {/* <Avatar className="h-4 w-4">
                <AvatarImage src={ticket.createdBy} />
              </Avatar> */}
              <span className="text-muted-foreground" >{ticket.createdBy}</span>
              -
              <span className=" text-muted-foreground">{format(ticket.createdAt, "MMM d, yyyy")}</span>

            </div>

            <p className="mt-2 text-sm text-muted-foreground">{ticket.description}</p>
            <div className="mt-4 flex items-center gap-4 flex-wrap">
              <Badge variant="secondary" className="rounded-sm">
                category: {ticket.category}
              </Badge>
              <Badge variant="secondary" className={` rounded-sm ${statusColor}`}>
                status: {ticket.status}
              </Badge>
            </div>
          </div>
        </div>
        <Link href={`${isConsole ? CONSOLE_TICKETS_ROUTE : TICKETS_ROUTE}/${ticket.id}`} >
          <Button variant="ghost" size="sm" className="ml-auto">
            Open Ticket
          </Button>
        </Link>
      </div>
    </div>
  )
}

