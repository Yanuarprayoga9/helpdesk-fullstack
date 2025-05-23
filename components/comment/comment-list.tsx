
import { CommentType } from "@/@types/ticket-comment";
import "./ticket-comment.css"

import { CommentItem } from "./parent/comment-parent";
interface ICommentList {
  parentComments: CommentType[]
}
export function CommentList({ parentComments }: ICommentList) {
  return (
    <>
      {parentComments.map(comment => (
        <CommentItem key={comment.id} comment={comment}  />
      ))}
    </>
  );
}

