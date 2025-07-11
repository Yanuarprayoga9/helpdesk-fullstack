"use client"
import { deleteAssignee } from '@/actions/ticket-assignee';
import { Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";

interface AssigneeDeleteButtonProps {
    userId: string
    ticketId: string
}
const AssigneeDeleteButton = ({ ticketId, userId }: AssigneeDeleteButtonProps) => {

    const [createdBy, setCreatedBy] = useState("")
    const sessionId = useSession().data?.user.id


    useEffect(() => {
        if (typeof window !== "undefined") {
            const createdByL = localStorage.getItem("createdBy")
            setCreatedBy(createdByL as string)

        }
    }, [])

    const isOwner = createdBy == sessionId
    const handleDeteleAssignee = async () => {
        const deleteTicket = await deleteAssignee(ticketId, userId)

        if (!deleteTicket.success) {
            toast.error("failed to delete assignee")
        } else {
            toast.success(deleteTicket.message as string)
        }
    }
    return (
        <div className={!isOwner ? "hidden" : ""}>
            <Trash2 className=" h-4 w-4 text-red-500 " onClick={handleDeteleAssignee} />

        </div>
    )
}

export default AssigneeDeleteButton
