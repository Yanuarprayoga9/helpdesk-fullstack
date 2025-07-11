"use client";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CommentForm } from "../comment-form";
import { CommentType } from "@/@types/ticket-comment";
import { CommentItemActions } from "../comment-actions";
import { useCommentStore } from "@/store/zustand/use-comment-store";

interface CommentReplyProps {
  reply: CommentType;
  parentId: string;
}

export function CommentReply({ reply, parentId }: CommentReplyProps) {
  const { editingCommentId, setEditingCommentId, fetchReplies } = useCommentStore();
  const isEditing = editingCommentId === reply.id;

  return (
    <motion.div
      key={reply.id}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mb-4 border-l pl-4"
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Avatar className="h-5 w-5 rounded-full bg-primary">
            <span className="text-[10px] text-primary-foreground">{reply.userImage}</span>
          </Avatar>
          <span className="text-sm font-medium">{reply.userName}</span>
          <Badge variant="outline" className="border-border text-[10px]">{reply.userRole}</Badge>
        </div>
       
        <CommentItemActions ticketId={reply.ticketId as string} isMostHelpful={reply.itMostHelpful}  commentId={reply.id} isParent={false} ownerId={reply.userId} />
      </div>

      {isEditing ? (
        <CommentForm
          ticketId={reply.ticketId || ""}
          commentId={reply.id}
          defaultValue={reply.comment}
          parentCommentId={reply.parentCommentId}
          onSuccess={() => {
            setEditingCommentId(null);
            fetchReplies(parentId);
          }}
        />
      ) : (
        <div
          className="text-sm ticket-comment"
          dangerouslySetInnerHTML={{ __html: reply.comment }}
        />
      )}
    </motion.div>
  );
}
