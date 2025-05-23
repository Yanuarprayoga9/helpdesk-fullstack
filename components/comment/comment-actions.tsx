"use client";
import { useCommentStore } from "@/store/zustand/use-comment-store";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <CommentDeleteButton commentId={commentId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

