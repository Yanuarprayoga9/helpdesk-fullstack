import { TicketCard } from "./ticket-card"

// interface ITicketList = {
//   tickets :TicketT
// }
const MOCK_TICKETS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: "Project Loan Management",
  error: "Error CI/CD Pipelines Azure cloud",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  user: {
    name: "John Snow",
    avatar: "/placeholder.svg",
  },
  timestamp: "Posted at 12:45 AM",
}))

export function TicketList() {
  return (
    <div className="space-y-4">
      {MOCK_TICKETS.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  )
}

