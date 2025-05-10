import { TicketShowType } from "@/@types/ticket"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {  TICKETS_ROUTE } from "@/constants/routes"
import { format } from "date-fns"
import Link from "next/link"

interface ITicketCard {
  ticket: TicketShowType
}

export function TicketCard({ ticket }: ITicketCard) {
  return (
    <div className="rounded-lg border bg-card p-4 text-card-foreground  cursor-pointer">
      <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
        <div className="flex items-start gap-3 w-full">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
              <h3 className="font-medium">{ticket.title}</h3>
              <Badge variant="destructive" className="rounded-sm">
                High Risk
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{ticket.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{ticket.description}</p>
            <div className="mt-4 flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={ticket.createdBy} />
                  <AvatarFallback>
                    {/* {ticket..name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")} */}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{ticket.createdBy}</span>
              </div>
              <Badge variant="secondary" className="rounded-sm">
                Infrastructure
              </Badge>
              <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 rounded-sm">
                On Progress
              </Badge>
              <span className="text-sm text-muted-foreground">{format(ticket.createdAt, "MMM d, yyyy")}</span>
            </div>
          </div>
        </div>
        <Link href={`${TICKETS_ROUTE}/${ticket.id}`} >
          <Button variant="ghost" size="sm" className="ml-auto">
            Open Ticket
          </Button>
        </Link>
      </div>
    </div>
  )
}

