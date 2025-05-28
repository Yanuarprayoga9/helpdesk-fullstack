"use client";
import { useCommentStore } from "@/store/zustand/use-comment-store";

import { Pen } from "lucide-react";
import { CommentDeleteButton } from "./comment-delete-form";
import { useSession } from "next-auth/react";

interface ICommentActions {
  commentId: string;
  isParent: boolean;
  ownerId: string;
}


export const CommentItemActions = ({ commentId, isParent, ownerId }: ICommentActions) => {
  const session = useSession()



  const { setEditingCommentId, setEditingReplyId } = useCommentStore();

  const handleEdit = () => {
    if (isParent) {
      setEditingCommentId(commentId);
    } else {
      setEditingReplyId(commentId);
    }
  };
  if (session.data?.user.id !== ownerId) {
    return ""
  }
  return (
    <div className="flex">
      <Pen className="w-4 h-4 cursor-pointer" onClick={handleEdit}>Edit</Pen>
      <CommentDeleteButton commentId={commentId} />

    </div>

  );
};

