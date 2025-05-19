"use server"

import { TICKETS_ROUTE } from "@/constants/routes";
import { addAssigneesSchema } from "@/schemas";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
const prisma = new PrismaClient();

export const addAssignees = async (
  values: z.infer<typeof addAssigneesSchema>,
  ticketId: string
): Promise<ActionResult> => {
  try {
    // Validasi assignees saja
    const parsedData = addAssigneesSchema.safeParse(values);
    if (!parsedData.success) {
      return { success: false, message: parsedData.error.errors[0].message };
    }

    const { assignees } = parsedData.data;

    console.log({ assignees })

    // Cek ticket
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      return { success: false, message: "Ticket not found." };
    }

    if (assignees.length === 0) {
      return { success: false, message: "No users selected." };
    }

    // Insert assignees
    await prisma.ticketAssignee.createMany({
      data: assignees.map(userId => ({
        ticketId,
        userId,
      })),
    });
    revalidatePath(`${TICKETS_ROUTE}/${ticketId}`);

    return { success: true, message: "Assigned users added successfully." };

  } catch (error: any) {
    console.error("Error adding assignees:", error);

    if (error.code === "P2002") {
      return { success: false, message: "User already assigned to this ticket." };
    }

    return { success: false, message: error.message || "Internal server error." };
  }
};

