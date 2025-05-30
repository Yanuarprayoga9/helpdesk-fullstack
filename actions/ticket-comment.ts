"use server";

import { getCurrentUser } from "@/@data/user";
import { CommentReturn } from "@/@types/ticket-comment";
import { TICKETS_ROUTE } from "@/constants/routes";
// import { sendMail } from "@/lib/mail";
// import prisma from "@/lib/db";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";



const prisma = new PrismaClient()
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

    const me = await getCurrentUser()
    const userId = me.user?.id as string
    await prisma.ticketComment.create({
      data: {
        ticketId,
        userId,
        comment,
        parentCommentId,
      },
    });
        // await sendMail("yanuarprayogat@gmail.com", "Pesan dari VR Jakarta 🚀", `<p>Ticket successfully created</p>`);

    revalidatePath(`${TICKETS_ROUTE}/${ticketId}`);

    return { success: true,  message: "comment added successfully" };
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
  console.log({ comment })
  try {
    const updatedComment = await prisma.ticketComment.update({
      where: { id },
      data: {
        comment,
      },
    });

    // revalidatePath(`${TICKETS_ROUTE}/${}`);

    return { success: true, message: "comment updated successfully" };
  } catch (error) {
    console.error("Failed to update ticket comment:", error);
    return { success: false, message: "Failed to update ticket comment" };
  }
}


export const softDeleteTicketComment = async (id: string,ticketId:string): Promise<CommentReturn> => {
  try {
    const deleteComment = await prisma.ticketComment.update({
      where: { id },
      data: {
        // delete:true,
        deleted: true
      },
    });
        revalidatePath(`${TICKETS_ROUTE}/${ticketId}/string`);

    return { success: true, message: "comment deleted successfully" };

  } catch (error) {
    console.error("Failed to delete ticket comment:", error);
    return { success: false, message: "Failed to delete ticket comment" };
  }
}