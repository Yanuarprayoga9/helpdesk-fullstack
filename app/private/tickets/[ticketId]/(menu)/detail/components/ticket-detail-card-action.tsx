import React from 'react'
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TicketDeleteForm } from "../../components/ticket-delete-form";
import Link from "next/link";
import { TICKETS_ROUTE } from "@/constants/routes";
import { Button } from '@/components/ui/button';
interface IDetailAction {
    ticketId: string
}
const TicketDetailAction: React.FC<IDetailAction> = ({ ticketId }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href={`${TICKETS_ROUTE}/${ticketId}/edit`}>Edit</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <TicketDeleteForm ticketId={ticketId} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default TicketDetailAction
