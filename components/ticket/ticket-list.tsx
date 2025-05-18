import { TicketShowType } from "@/@types/ticket"
import { TicketCard } from "./ticket-card"

interface ITicketList {
  tickets: TicketShowType[]
}

export function TicketList({ tickets }: ITicketList) {
  return (
    <div className="space-y-4">
      {tickets && tickets.length > 0 ? (
        tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))
      ) : (
        <h1>No tickets found.</h1>
      )}
    </div>
  )
}
