import React from 'react'
import CommentFilter from './comment-filter'
import { CommentList } from './comment-list'
import { CommentForm } from './comment-form'
import { CommentType } from '@/@types/ticket-comment'
interface IAppTicketComments {
  parentComments: CommentType[]
  userId: string
  ticketId: string
}
const AppComment: React.FC<IAppTicketComments> = ({ parentComments, userId, ticketId }) => {
  return (
    <div>
      <CommentFilter />
      <CommentList parentComments={parentComments} />
      <CommentForm ticketId={ticketId} userId={userId} />
    </div>
  )
}

export default AppComment
