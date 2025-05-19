"use server";

import { CommentReturn, CommentsReturn } from "@/@types/ticket-comment";
import { TICKETS_ROUTE } from "@/constants/routes";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache"; // kalau pakai ISR atau cache path tertentu

// Create Ticket Comment
export async function createTicketComment({
  ticketId,
  userId,
  comment,
  imageUrl = null,
  parentCommentId = null,
}: {
  ticketId: string;
  userId: string;
  comment: string;
  imageUrl?: string | null;
  parentCommentId?: string | null;
}):Promise<CommentReturn> {
  try {
    const newComment = await prisma.ticketComment.create({
      data: {
        ticketId,
        userId,
        comment,
        imageUrl,
        parentCommentId,
      },
    });

    // Optional: trigger revalidate halaman detail ticket
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
  imageUrl,
}: {
  id: string;
  comment: string;
  imageUrl?: string | null;
}):Promise<CommentReturn> {
  try {
    const updatedComment = await prisma.ticketComment.update({
      where: { id },
      data: {
        comment,
        imageUrl,
      },
    });

    // Optional: bisa revalidate detail halaman kalau perlu
    revalidatePath(TICKETS_ROUTE);

    return { success: true, comment: updatedComment,message:"comment updated successfully" };
  } catch (error) {
    console.error("Failed to update ticket comment:", error);
    return { success: false, message: "Failed to update ticket comment" };
  }
}
