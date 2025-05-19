
export type CommentType = {
    id: string
    // ticketId: string
    userId: string
    userName:string
    userImage:string
    userRole:string
    comment: string
    imageUrl: string
    createdAt: string
    parentCommentId: string
}

export interface CommentsReturn extends ActionResult {
    comments?: CommentType[]
}

export interface CommentReturn extends ActionResult {
    comment?: CommentType
}

