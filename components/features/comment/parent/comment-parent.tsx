"use client";
import { MessageSquare, CheckCircle } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CommentType } from "@/@types/ticket-comment";
import { useState } from "react";
import { CommentForm } from "../comment-form";
import { motion, AnimatePresence } from "framer-motion";
import { CommentReply } from "../reply/comment-reply";
import { useCommentStore } from "@/store/zustand/use-comment-store";
import { CommentItemActions } from "../comment-actions";
import { formatDate } from "@/lib/utils";

interface ICommentType {
  comment: CommentType;
}

export function CommentItem({ comment }: ICommentType) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { replies, fetchReplies, editingCommentId, setEditingCommentId } = useCommentStore();
  const isEditing = editingCommentId === comment.id;


  const commentReplies = replies[comment.id] || [];

  console.log({ commentReplies })
  return (
    <div className="mb-6 rounded-md border border-border bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6 rounded-full bg-primary">
            <span className="text-xs text-primary-foreground">{comment.userImage}</span>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{comment.userName}</span>
            <span className="text-xs text-secondary-foreground">{formatDate(comment.createdAt)}</span>

          </div>
          <Badge variant="outline" className="border-border text-xs">{comment.userRole}</Badge>
        </div>
        {
          comment.itMostHelpful && (
            <Badge className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200">
              <CheckCircle className="w-3 h-3 mr-1 text-green-600" />
              Verified Helpful
            </Badge>
          )
        }

        <CommentItemActions ticketId={comment.ticketId as string} isMostHelpful={comment.itMostHelpful} commentId={comment.id} isParent={true} ownerId={comment.userId} />
      </div>

      {/* Content */}
      <div className="p-4">
        {isEditing ? (
          <CommentForm
            ticketId={comment.ticketId || ""}
            commentId={comment.id}
            defaultValue={comment.comment}
            onSuccess={() => {
              setEditingCommentId(null);
            }}
          />
        ) : (
          <div className="ticket-comment" dangerouslySetInnerHTML={{ __html: comment.comment }} />
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border p-2">
        <div className="flex items-center gap-2">

          <Button
            variant="ghost"
            size="sm"
            className="h-8"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            <MessageSquare className="h-4 w-4" />
            Reply
          </Button>
        </div>
      </div>

      {/* Reply Form */}
      <AnimatePresence>
        {showReplyForm && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="pl-6 pt-2"
          >
            <CommentForm
              ticketId={comment.ticketId || ""}
              parentCommentId={comment.id}
              onSuccess={() => {
                setShowReplyForm(false);
                fetchReplies(comment.id);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Replies */}
      <div className="pl-6 pt-2">
        {commentReplies.length > 0 ? (
          commentReplies.map((reply) => (
            <CommentReply key={reply.id} reply={reply} parentId={comment.id} />
          ))
        ) : (
          <div className="text-xs text-muted-foreground">No replies yet.</div>
        )}
      </div>
    </div>
  );
}
