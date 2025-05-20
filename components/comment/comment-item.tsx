"use client";

import { ThumbsUp, MessageSquare, MoreHorizontal } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CommentType } from "@/@types/ticket-comment";
import { useEffect, useState } from "react";
import { getRepliesByCommentId } from "@/@data/ticket-comment";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { CommentForm } from "./comment-form";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface ICommentType {
    comment: CommentType;
}

export function CommentItem({ comment }: ICommentType) {
    const [replies, setReplies] = useState<CommentType[]>([]);
    const [loadingReplies, setLoadingReplies] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [editingReplyId, setEditingReplyId] = useState<string | null>(null);


    const fetchReplies = async () => {
        try {
            const res = await getRepliesByCommentId(comment.id);
            if (res.success) {
                setReplies(res.comments || []);
            }
        } catch (err) {
            toast.error("Failed to fetch replies:" + err as string);
        } finally {
            setLoadingReplies(false);


        }
    };

    useEffect(() => {
        fetchReplies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comment.id]);

    return (
        <div className="mb-6 rounded-md border border-border bg-background">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-4">
                <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 rounded-full bg-primary">
                        <span className="text-xs text-primary-foreground">
                            {comment.userImage}
                        </span>
                    </Avatar>
                    <span className="font-medium">{comment.userName}</span>
                    <Badge variant="outline" className="border-border text-xs">
                        {comment.userRole}
                    </Badge>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setIsEditing(true)}>
                            Edit
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Content */}
            <div className="p-4">
                {isEditing ? (
                    <CommentForm
                        ticketId={comment.ticketId || ""}
                        commentId={comment.id}
                        defaultValue={comment.comment}
                        onSuccess={() => setIsEditing(false)}
                    />
                ) : (
                    <div className="ticket-comment" dangerouslySetInnerHTML={{ __html: comment.comment }} />
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border p-2">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8">
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        likes: 3
                    </Button>
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
                                fetchReplies();
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Replies */}
            <div className="pl-6 pt-2">
                {loadingReplies ? (
                    <div className="text-xs text-muted-foreground">Loading replies...</div>
                ) : replies.length > 0 ? (
                    replies.map((reply) => (
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
                                        <span className="text-[10px] text-primary-foreground">
                                            {reply.userImage}
                                        </span>
                                    </Avatar>
                                    <span className="text-sm font-medium">{reply.userName}</span>
                                    <Badge variant="outline" className="border-border text-[10px]">
                                        {reply.userRole}
                                    </Badge>
                                </div>

                                {/* Dropdown untuk edit reply */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-6 w-6">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => setEditingReplyId(reply.id)}>
                                            Edit
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            {/* Tampilkan form jika editing */}
                            {editingReplyId === reply.id ? (
                                <CommentForm
                                    ticketId={reply.ticketId || ""}
                                    commentId={reply.id}
                                    defaultValue={reply.comment}
                                    parentCommentId={reply.parentCommentId}
                                    onSuccess={() => {
                                        setEditingReplyId(null);
                                        fetchReplies();
                                    }}
                                />
                            ) : (
                                <div
                                    className="text-sm ticket-comment"
                                    dangerouslySetInnerHTML={{ __html: reply.comment }}
                                />
                            )}
                        </motion.div>
                    ))

                ) : (
                    <div className="text-xs text-muted-foreground">No replies yet.</div>
                )}
            </div>
        </div>
    );
}
