"use server"

import { z } from "zod";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { assignmentRequestSchema } from "@/schemas"; // Buat skema validasi Zod yang sesuai

export const createTicketAssignmentRequest = async (values: z.infer<typeof assignmentRequestSchema>) => {
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
    } catch (error) {
        console.error("Error creating assignment request:", error);
        return { success: false, message: (error as Error).message };
    }
};
export const updateTicketAssignmentRequestStatus = async (
    id: string,
    status: "Accepted" | "Rejected"
) => {
    try {
        const request = await prisma.ticketAssignmentRequest.findUnique({ where: { id } });
        if (!request) return { success: false, message: "Request not found" };

        await prisma.ticketAssignmentRequest.update({
            where: { id },
            data: { status }
        });

        return { success: true, message: `Request has been ${status.toLowerCase()}` };
    } catch (error) {
        console.error("Error updating assignment request status:", error);
        return { success: false, message: (error as Error).message };
    }
};
export const deleteTicketAssignmentRequest = async (id: string) => {
    try {
        await prisma.ticketAssignmentRequest.delete({
            where: { id }
        });

        return { success: true, message: "Request deleted successfully" };
    } catch (error) {
        console.error("Error deleting assignment request:", error);
        return { success: false, message: (error as Error).message };
    }
};

