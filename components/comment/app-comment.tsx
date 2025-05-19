"use client"
import React, { useState } from 'react'
import CommentFilter from './comment-filter'
import { CommentList } from './comment-list'
import { CommentForm } from './comment-form'
import { CommentType } from '@/@types/ticket-comment'
import { DrawerWrapper } from '../modal/drawer-wrapper'
import { Button } from '../ui/button'
interface IAppTicketComments {
  parentComments: CommentType[]
  userId: string
  ticketId: string
}
const AppComment: React.FC<IAppTicketComments> = ({ parentComments, userId, ticketId }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <CommentFilter />
      <CommentList parentComments={parentComments} />
      <Button onClick={() => setOpen(true)} className="bg-blue-600 text-white">
        Add Comment
      </Button>
      <DrawerWrapper
        open={open}
        onClose={() => setOpen(false)}
        title="Add a Comment"
        description="Write your comment for this ticket."
      >
        <CommentForm
          ticketId={ticketId}
          userId={userId}
          onClose={() => setOpen(false)}
        />
      </DrawerWrapper>
    </div>
  )
}

export default AppComment
