import React from 'react'
import { TICKETS_ROUTE } from "@/constants/routes"
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const NewTicketButton = () => {
    return (
        <Link href={`${TICKETS_ROUTE}/create`}>
            <Button variant="outline" className="bg-green-500 hover:bg-green-600 text-white flex-1 sm:flex-none">
                New Discussion
            </Button>
        </Link>
    )
}

export default NewTicketButton
