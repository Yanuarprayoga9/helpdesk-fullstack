import { TicketShowType } from "@/@types/ticket"
import { TicketCard } from "./ticket-card"

interface ITicketList {
  tickets: TicketShowType[]
}


export function TicketList({tickets}:ITicketList) {
  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  )
}

