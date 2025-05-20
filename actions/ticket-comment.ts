"use server";

import { getCurrentUser } from "@/@data/user";
import { CommentReturn } from "@/@types/ticket-comment";
import { TICKETS_ROUTE } from "@/constants/routes";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache"; 

// Create Ticket Comment
export async function createTicketComment({
  ticketId,
  comment,
  parentCommentId = null,
}: {
  ticketId: string;
  comment: string;
  parentCommentId?: string | null;
}):Promise<CommentReturn> {
  try {

    const me = await getCurrentUser()
    const userId = me.user?.id
    const newComment = await prisma.ticketComment.create({
      data: {
        ticketId,
        userId,
        comment,
        parentCommentId,
      },
    });

    revalidatePath(`${TICKETS_ROUTE}/${ticketId}`);

    return { success: true, comment: newComment,message:"comment added successfully" };
  } catch (error) {
    console.error("Failed to create ticket comment:", error);
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
  console.log({comment})
  try {
    const updatedComment = await prisma.ticketComment.update({
      where: { id },
      data: {
        comment,
      },
    });

    revalidatePath(TICKETS_ROUTE);

    return { success: true, comment: updatedComment, message: "comment updated successfully" };
  } catch (error) {
    console.error("Failed to update ticket comment:", error);
    return { success: false, message: "Failed to update ticket comment" };
  }
}
