"use server";

import { z } from "zod";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { assignmentRequestSchema } from "@/schemas";
import { TICKETS_ROUTE } from "@/constants/routes";
import { Prisma } from "@prisma/client";

interface ActionResult {
  success: boolean;
  message: string;
}

export const createTicketAssignmentRequest = async (
  values: z.infer<typeof assignmentRequestSchema>
): Promise<ActionResult> => {
  try {
    const parsed = assignmentRequestSchema.safeParse(values);
    if (!parsed.success) {
      return { success: false, message: parsed.error.errors[0].message };
    }

    const existingRequest = await prisma.ticketAssignmentRequest.findFirst({
      where: {
        ticketId: values.ticketId,
        requestedById: values.requestedById,
        status: "Pending"
      }
    });

    if (existingRequest) {
      return { success: false, message: "Assignment request already pending." };
    }

    await prisma.ticketAssignmentRequest.create({
      data: {
        ticketId: values.ticketId,
        requestedById: values.requestedById,
        notes: values.notes
      }
    });

    revalidatePath("/console/tickets");

    return { success: true, message: "Assignment request created successfully." };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Internal server error." };
  }
};

export const updateTicketAssignmentRequestStatus = async (
  id: string,
  status: "Accepted" | "Rejected"
): Promise<ActionResult> => {
  try {
    const request = await prisma.ticketAssignmentRequest.findUnique({ where: { id } });
    if (!request) return { success: false, message: "Request not found" };

    await prisma.ticketAssignmentRequest.update({
      where: { id },
      data: { status }
    });

    return { success: true, message: `Request has been ${status.toLowerCase()}` };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Internal server error." };
  }
};

export const deleteTicketAssignmentRequest = async (id: string): Promise<ActionResult> => {
  try {
    await prisma.ticketAssignmentRequest.delete({
      where: { id }
    });

    return { success: true, message: "Request deleted successfully" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Internal server error." };
  }
};

export const acceptRequestAssignment = async (requestId: string): Promise<ActionResult> => {
  try {
    const request = await prisma.ticketAssignmentRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      return { success: false, message: "Request not found." };
    }

    if (request.status === "Accepted") {
      return { success: false, message: "Request has already been accepted." };
    }

    // Coba assign, skip kalau udah ada
    try {
      await prisma.ticketAssignee.create({
        data: {
          ticketId: request.ticketId,
          userId: request.requestedById,
        },
      });
    } catch (assignError: unknown) {
      if (assignError instanceof Prisma.PrismaClientKnownRequestError) {
        if (assignError.code === "P2002") {
          return { success: false, message: "User already assigned to this ticket." };
        }
      }
      if (assignError instanceof Error) {
        return { success: false, message: assignError.message };
      }
      return { success: false, message: "Failed to assign user to ticket." };
    }

    // Update status request
    await prisma.ticketAssignmentRequest.update({
      where: { id: requestId },
      data: {
        status: "Accepted",
      },
    });

    // Revalidate halaman detail ticket
    revalidatePath(`${TICKETS_ROUTE}/${request.ticketId}/detail`);

    return { success: true, message: "Request accepted and user assigned to ticket." };

  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Internal server error." };
  }
};