import React from 'react'
import { TicketList } from './ticket-list'
import { TicketShowType } from '@/@types/ticket'
interface IAppTickets {
    tickets: TicketShowType[]
}
const AppTickets: React.FC<IAppTickets> = ({ tickets }) => {
    return (
        <div>
            <TicketList tickets={tickets || []} />
        </div>
    )
}

export default AppTickets
