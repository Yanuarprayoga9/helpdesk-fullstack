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
