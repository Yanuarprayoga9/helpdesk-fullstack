"use server"

import { CommentsReturn, CommentType } from "@/@types/ticket-comment";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getParentCommentsByTicketId = async (ticketId: string): Promise<CommentsReturn> => {
  try {
    const comments = await prisma.ticketComment.findMany({
      where: {
        ticketId,
        deleted: false,
        parentCommentId: null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const mappedComments: CommentType[] = comments.map((comment) => ({
      id: comment.id,
      userId: comment.user.id,
      ticketId: comment.ticketId,

      userName: comment.user.name,
      userImage: comment.user.imageUrl || "",
      userRole: comment.user.role?.name || "",
      comment: comment.comment,
      imageUrl: comment.imageUrl || "",
      createdAt: comment.createdAt.toISOString(),
      parentCommentId: comment.parentCommentId || "",
    }));

    return {
      success: true,
      comments: mappedComments,
    };

  } catch (error) {
    console.error("Failed to fetch parent comments:", error);
    return {
      success: false,
      message: "Failed to fetch parent comments",
    };
  }
};



export const getRepliesByCommentId = async (parentCommentId: string): Promise<CommentsReturn> => {
  try {
    const replies = await prisma.ticketComment.findMany({
      where: {
        parentCommentId,
        deleted: false,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const mappedReplies: CommentType[] = replies.map((reply) => ({
      id: reply.id,
      userId: reply.user.id,
      userName: reply.user.name,
      ticketId: reply.ticketId,
      userImage: reply.user.imageUrl || "",
      userRole: reply.user.role?.name || "",
      comment: reply.comment,
      imageUrl: reply.imageUrl || "",
      createdAt: reply.createdAt.toISOString(),
      parentCommentId: reply.parentCommentId || "",
    }));

    return {
      success: true,
      comments: mappedReplies,
    };

  } catch (error) {
    console.error("Failed to fetch replies:", error);
    return {
      success: false,
      message: "Failed to fetch replies",
    };
  }
};
