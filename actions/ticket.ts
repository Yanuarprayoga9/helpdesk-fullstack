"use server"

import { TicketReturn } from "@/@types/ticket";
import { getCurrentUser } from "@/@data/user";
import { ticketSchema } from "@/schemas";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { TICKETS_ROUTE } from "@/constants/routes";



const prisma = new PrismaClient();

export const editTicket = async (
    id: string,
    values: Partial<z.infer<typeof ticketSchema>>
): Promise<TicketReturn> => {
    try {
        const me = await getCurrentUser();
        if (!me.user?.id) {
            return { success: false, message: "UNAUTHENTICATED" };
        }

        const parsedData = ticketSchema.partial().safeParse(values);
        if (!parsedData.success) {
            return { success: false, message: parsedData.error.errors[0].message };
        }

        const { title, description, category, priority, status, project, images, assignees } = parsedData.data;

        const dataToUpdate: any = {
            ...(title !== undefined && { title }),
            ...(description !== undefined && { description }),
            ...(category !== undefined && { categoryId: category }),
            ...(priority !== undefined && { priorityId: priority }),
            ...(status !== undefined && { statusId: status }),
            ...(project !== undefined && { projectId: project }),
            ...(images?.[0]?.url !== undefined && { imageUrl: images[0].url }),
        };

        console.log({ assignees })
        if (assignees !== undefined) {
            // Hapus assignee lama
            await prisma.ticketAssignee.deleteMany({
                where: { ticketId: id },
            });

            // Tambah assignee baru kalau ada
            if (assignees.length > 0) {
                await prisma.ticketAssignee.createMany({
                    data: assignees.map((userId: string) => ({
                        ticketId: id,
                        userId,
                    })),
                });
            }
        }

        if (Object.keys(dataToUpdate).length === 0) {
            return { success: false, message: "No fields to update." };
        }

        await prisma.ticket.update({
            where: { id },
            data: dataToUpdate,
        });
        revalidatePath(`${TICKETS_ROUTE}/${id}`);

        return { success: true, message: "Ticket updated successfully." };

    } catch (error: any) {
        console.error("Error updating ticket:", error);

        if (error.code === "P2002") {
            return { success: false, message: "Ticket title must be unique." };
        }

        return { success: false, message: error.message || "Internal server error." };
    }
};




export const createTicket = async (values: z.infer<typeof ticketSchema>): Promise<TicketReturn> => {
    try {
        const me = await getCurrentUser();
        if (!me.user?.id) {
            return { success: false, message: "UNAUTHENTICATED" };
        }
        const parsedData = ticketSchema.safeParse(values);
        if (!parsedData.success) {
            return { success: false, message: parsedData.error.errors[0].message };
        }
        console.log({ parsedData })
        await prisma.ticket.create({
            data: {
                title: values.title,
                description: values.description,
                assignees: {
                    create: values.assignees.map((userId) => ({
                        userId: userId,
                    })),
                },
                categoryId: values.category,
                priorityId: values.priority,
                imageUrl: values.images[0].url,
                projectId: values.project,
                createdById: me.user.id,
            }
        })

        return { success: true, message: "Ticket successfully created" };

    } catch (error: any) {
        console.error("Error creating category:", error);

        // Tangani error unik jika constraint unik di Prisma aktif
        if (error.code === "P2002") {
            return { success: false, message: "Ticket name must be unique." };
        }

        return { success: false, message: error.message };
    }
}
