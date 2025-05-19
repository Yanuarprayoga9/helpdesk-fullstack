import React from 'react'
import CommentFilter from './comment-filter'
import { CommentList } from './comment-list'
import { CommentForm } from './comment-form'
import { CommentType } from '@/@types/ticket-comment'
interface IAppTicketComments {
parentComments:CommentType[]
}
const AppComment:React.FC<IAppTicketComments> = ({parentComments}) => {
  return (
    <div>
        <CommentFilter/>
        <CommentList parentComments={parentComments}/>
        <CommentForm/>
    </div>
  )
}

export default AppComment
