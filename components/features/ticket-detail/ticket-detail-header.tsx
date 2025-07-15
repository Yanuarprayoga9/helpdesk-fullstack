import React from 'react'
import { format } from "date-fns"
import { TicketType } from '@/@types/ticket'
interface ITicketDetailHeader {
    ticket: TicketType
}
export const TicketDetailHeader: React.FC<ITicketDetailHeader> = ({ ticket }) => {
    return (

        <div className="mb-6">
            <h1 className="text-2xl font-semibold"> #{ticket.backlog} {ticket?.title} </h1>
            <div className="mt-1 text-sm">
                <span className="text-muted-foreground"> {ticket.createdBy.name} started this conversation in {format(ticket.createdAt, "MMM d, yyyy")}</span>
                <span className="font-medium"> {ticket.category.name}</span>
            </div>
        </div>
    )
}

