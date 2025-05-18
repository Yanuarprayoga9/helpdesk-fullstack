import React from 'react'
import CommentFilter from './comment-filter'
import { CommentList } from './comment-list'
import { CommentForm } from './comment-form'

const AppComment = () => {
  return (
    <div>
        <CommentFilter/>
        <CommentList/>
        <CommentForm/>
    </div>
  )
}

export default AppComment
