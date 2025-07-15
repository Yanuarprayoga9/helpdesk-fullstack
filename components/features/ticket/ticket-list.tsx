"use client"
import { Grid, List } from "lucide-react"
import { TicketCard } from "./ticket-card"
import { TicketShowType } from "@/@types/ticket"
import { useState } from "react"
interface ITicketList {
  tickets: TicketShowType[]
  isConsole: boolean
}
// Updated TicketList component
export function TicketList({ tickets, isConsole }: ITicketList) {
  const [isGridView, setIsGridView] = useState<boolean>(false)

  if (isGridView) {
    return (
      <div className="space-y-4">
        {/* Toggle Controls */}
        <div className="flex items-center justify-end">
          <div className="flex items-center border rounded-lg p-1">
            <button
              onClick={() => setIsGridView(false)}
              className={`p-2 rounded-md transition-all ${!isGridView
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
                }`}
              title="List View"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsGridView(true)}
              className={`p-2 rounded-md transition-all ${isGridView
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
                }`}
              title="Grid View"
            >
              <Grid className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tickets && tickets.length > 0 ? (
            tickets.map((ticket) => (
              <TicketCard key={ticket.id} isConsole={isConsole} ticket={ticket} isGridView={isGridView} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <h1 className="text-muted-foreground">No tickets found.</h1>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Toggle Controls */}
      <div className="flex items-center justify-end">
        <div className="flex items-center border rounded-lg p-1">
          <button
            onClick={() => setIsGridView(false)}
            className={`p-2 rounded-md transition-all ${!isGridView
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
              }`}
            title="List View"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsGridView(true)}
            className={`p-2 rounded-md transition-all ${isGridView
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
              }`}
            title="Grid View"
          >
            <Grid className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* List Layout */}
      <div className={`${isGridView && "flex flex-wrap"}`}>
        {tickets && tickets.length > 0 ? (
          tickets.map((ticket: TicketShowType) => (
            <TicketCard key={ticket.id} isConsole={isConsole} ticket={ticket} isGridView={isGridView} />

          ))
        ) : (
          <h1>No tickets found.</h1>
        )}
      </div>
    </div>
  )
}