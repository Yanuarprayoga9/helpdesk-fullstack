import React from 'react'
import { TicketList } from './ticket-list'
import { TicketShowType } from '@/@types/ticket'
interface IAppTickets {
    tickets: TicketShowType[]
    isConsole:boolean
}
const AppTickets: React.FC<IAppTickets> = ({ tickets,isConsole }) => {
    return (
        <div>
            <TicketList tickets={tickets || []} isConsole={isConsole} />
        </div>
    )
}

export default AppTickets
