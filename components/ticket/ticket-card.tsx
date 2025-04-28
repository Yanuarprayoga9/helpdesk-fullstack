import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CONSOLE_TICKETS_ROUTE } from "@/constants/routes"
import Link from "next/link"

interface TicketCardProps {
  ticket: {
    id: number
    title: string
    description: string
    error: string
    user: {
      name: string
      avatar: string
    }
    timestamp: string
  }
}

export function TicketCard({ ticket }: TicketCardProps) {
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
            <p className="text-sm text-muted-foreground">{ticket.error}</p>
            <p className="mt-2 text-sm text-muted-foreground">{ticket.description}</p>
            <div className="mt-4 flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={ticket.user.avatar} />
                  <AvatarFallback>
                    {ticket.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{ticket.user.name}</span>
              </div>
              <Badge variant="secondary" className="rounded-sm">
                Infrastructure
              </Badge>
              <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 rounded-sm">
                On Progress
              </Badge>
              <span className="text-sm text-muted-foreground">{ticket.timestamp}</span>
            </div>
          </div>
        </div>
        <Link href={`${CONSOLE_TICKETS_ROUTE}/${ticket.id}`} >
          <Button variant="ghost" size="sm" className="ml-auto">
            Open Ticket
          </Button>
        </Link>
      </div>
    </div>
  )
}

