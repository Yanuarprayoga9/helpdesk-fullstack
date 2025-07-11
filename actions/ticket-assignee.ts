"use server";

import { TICKETS_ROUTE } from "@/constants/routes";
import { addAssigneesSchema } from "@/schemas";
import { PrismaClient, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

interface ActionResult {
  success: boolean;
  message: string;
}

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
    revalidatePath(`${TICKETS_ROUTE}/${ticketId}/detail`);

    return { success: true, message: "Assigned users added successfully." };

  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { success: false, message: "User already assigned to this ticket." };
      }
    }

    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return { success: false, message: "Internal server error." };
  }
};

export const deleteAssignee = async (
  ticketId: string,
  assigneeId: string
): Promise<ActionResult> => {
  try {
    const existingEntry = await prisma.ticketAssignee.findUnique({
      where: {
        ticketId_userId: {
          ticketId: ticketId,
          userId: assigneeId,
        },
      },
    });

    if (!existingEntry) {
      return { success: false, message: "Assigned entry not found." };
    }

    await prisma.ticketAssignee.delete({
      where: {
        ticketId_userId: {
          ticketId: ticketId,
          userId: assigneeId,
        },
      },
    });

    revalidatePath(`${TICKETS_ROUTE}/${ticketId}/detail`);

    return { success: true, message: "Assigned user removed successfully." };

  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { success: false, message: "User already assigned to this ticket." };
      }
    }

    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return { success: false, message: "Internal server error." };
  }
};