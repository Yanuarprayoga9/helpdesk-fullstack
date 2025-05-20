"use client"
import React from 'react'
import CommentFilter from './comment-filter'
import { CommentList } from './comment-list'
import { CommentForm } from './comment-form'
import { CommentType } from '@/@types/ticket-comment'

interface IAppTicketComments {
  parentComments: CommentType[]
  ticketId: string
}

const AppComment: React.FC<IAppTicketComments> = ({ parentComments, ticketId }) => {


  return (
    <div>

      <CommentFilter />
      <CommentList parentComments={parentComments}  />

      <CommentForm
        ticketId={ticketId}

      />
    </div>
  )
}

export default AppComment
