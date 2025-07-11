"use server";

import { getCurrentUser } from "@/@data/user";
import { CommentReturn } from "@/@types/ticket-comment";
import { TICKETS_ROUTE } from "@/constants/routes";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// Create Ticket Comment
export async function createTicketComment({
  ticketId,
  comment,
  parentCommentId = null,
}: {
  ticketId: string;
  comment: string;
  parentCommentId?: string | null;
}): Promise<CommentReturn> {
  try {
    const me = await getCurrentUser();
    const userId = me.user?.id as string;
    
    await prisma.ticketComment.create({
      data: {
        ticketId,
        userId,
        comment,
        parentCommentId,
      },
    });

    revalidatePath(`${TICKETS_ROUTE}/${ticketId}`);

    return { success: true, message: "comment added successfully" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Failed to create ticket comment" };
  }
}

// Update Ticket Comment
export async function updateTicketComment({
  id,
  comment,
}: {
  id: string;
  comment: string;
}): Promise<CommentReturn> {
  try {
    await prisma.ticketComment.update({
      where: { id },
      data: {
        comment,
      },
    });

    return { success: true, message: "comment updated successfully" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Failed to update ticket comment" };
  }
}

export const softDeleteTicketComment = async (
  id: string,
  ticketId: string
): Promise<CommentReturn> => {
  try {
    await prisma.ticketComment.update({
      where: { id },
      data: {
        deleted: true
      },
    });

    revalidatePath(`${TICKETS_ROUTE}/${ticketId}/detail`);

    return { success: true, message: "comment deleted successfully" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Failed to delete ticket comment" };
  }
};

// Mark comment as most helpful
export async function markCommentAsMostHelpful({
  commentId,
  ticketId,
}: {
  commentId: string;
  ticketId: string;
}): Promise<CommentReturn> {
  try {
    // First, reset all comments for this ticket to not be most helpful
    await prisma.ticketComment.updateMany({
      where: { 
        ticketId,
        isMostHelpful: true 
      },
      data: {
        isMostHelpful: false
      }
    });

    // Then mark the selected comment as most helpful
    await prisma.ticketComment.update({
      where: { id: commentId },
      data: {
        isMostHelpful: true
      }
    });

    revalidatePath(`${TICKETS_ROUTE}/${ticketId}/detail`);
    return { success: true, message: "Comment marked as most helpful" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Failed to mark comment as most helpful" };
  }
}

// Remove most helpful mark from comment
export async function removeCommentMostHelpful({
  commentId,
  ticketId,
}: {
  commentId: string;
  ticketId: string;
}): Promise<CommentReturn> {
  try {
    await prisma.ticketComment.update({
      where: { id: commentId },
      data: {
        isMostHelpful: false
      }
    });

    revalidatePath(`${TICKETS_ROUTE}/${ticketId}/detail`);
    return { success: true, message: "Most helpful mark removed" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Failed to remove most helpful mark" };
  }
}