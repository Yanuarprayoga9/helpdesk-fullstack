"use client";
import { useCommentStore } from "@/store/zustand/use-comment-store";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { MoreHorizontal, Pen, Trash2 } from "lucide-react";
import { CommentDeleteButton } from "./comment-delete-form";

interface ICommentActions {
  commentId: string;
  isParent: boolean;
}


export const CommentItemActions = ({ commentId, isParent }: ICommentActions) => {
  const { setEditingCommentId, setEditingReplyId } = useCommentStore();

  const handleEdit = () => {
    if (isParent) {
      setEditingCommentId(commentId);
    } else {
      setEditingReplyId(commentId);
    }
  };

  return (
    <div className="flex">
      <Pen className="w-4 h-4 cursor-pointer" onClick={handleEdit}>Edit</Pen>
      <CommentDeleteButton commentId={commentId} />

    </div>

  );
};

