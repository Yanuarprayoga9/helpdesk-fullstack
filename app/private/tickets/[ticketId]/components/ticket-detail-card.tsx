import { TicketType } from '@/@types/ticket'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MessageSquare, MoreHorizontal, ThumbsUp } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
interface ITicketDetailCard {
    ticket: TicketType
}
const TicketDetailCard = ({ ticket }: ITicketDetailCard) => {
    return (
        <div className="mb-6 rounded-md border border-border bg-background">
            <div className="flex items-center justify-between border-b border-border p-4">
                <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 rounded-full bg-primary">
                        <span className="text-xs text-primary-foreground">D</span>
                    </Avatar>
                    <span className="font-medium">{ticket.createdBy.name}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">edited</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="p-4">
                <p className="mb-4 max-w-full break-words">
                    {ticket.description}
                </p>

                {/* Added image */}
                <div className="mb-4 overflow-hidden rounded-md border border-border">
                    <Image
                        src={ticket.imageUrl || `/placeholder.svg?height=400&width=800`}
                        alt="Azure DevOps Pipeline Error Screenshot"
                        className="w-full"
                        width={800}
                        height={400}
                    />
                </div>
            </div>
            <div className="flex items-center justify-between border-t border-border p-2">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8">
                        <ThumbsUp className="mr-1 h-4 w-4" />1
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8">
                        <MessageSquare className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>

    )
}

export default TicketDetailCard
