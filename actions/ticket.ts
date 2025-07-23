"use server";

import { TicketReturn } from "@/@types/ticket";
import { getCurrentUser, getUserById } from "@/@data/user";
import { ticketSchema } from "@/schemas";
import { PrismaClient, Prisma } from "@prisma/client";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { TICKETS_ROUTE } from "@/constants/routes";
import { sendEmailTicketCreate, sendMailtest } from "@/lib/mail";
import { getUsersTicketByTicketId } from "@/@data/ticket-assignee";

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

        const { title, description, category, priority, status, project, images, assignees, backlog } = parsedData.data;

        const dataToUpdate: Record<string, unknown> = {
            ...(title !== undefined && { title }),
            ...(description !== undefined && { description }),
            ...(backlog !== undefined && { backlog }),
            ...(category !== undefined && { categoryId: category }),
            ...(priority !== undefined && { priorityId: priority }),
            ...(status !== undefined && { statusId: status }),
            ...(project !== undefined && { projectId: project }),
            ...(images?.[0]?.url !== undefined && { imageUrl: images[0].url }),
        };

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
        revalidatePath(`${TICKETS_ROUTE}/${id}/detail`);

        return { success: true, message: "Ticket updated successfully." };

    } catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return { success: false, message: "Ticket title must be unique." };
            }
        }

        if (error instanceof Error) {
            return { success: false, message: error.message };
        }

        return { success: false, message: "Internal server error." };
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

        const ticket = await prisma.ticket.create({
            data: {
                title: values.title,
                description: values.description,
                assignees: {
                    create: values.assignees.map((userId) => ({
                        userId: userId,
                    })),
                },
                backlog: values.backlog,
                categoryId: values.category,
                priorityId: values.priority,
                imageUrl: values.images[0].url,
                projectId: values.project,
                createdById: me.user.id,
            }
        });


        if (!process.env.RESEND_API_KEY) {
            throw `Abort: You need to define RESEND_API_KEY in the .env file.`;
        }

        const creator = await getUserById(me.user.id)
        console.log({ id: ticket.id, title: ticket.title, email: creator.user?.email })

        const getTicketUsers = await getUsersTicketByTicketId(ticket.id)

        const emails = getTicketUsers.users?.map(u => u.email)

        if (emails) {
            emails.forEach((e: string) => {
                sendMailtest({ email: e, ticketName: ticket.title, ticketId: ticket.id })
            });
        }


        console.log({ getTicketUsers })
        await sendEmailTicketCreate(ticket.id, ticket.title, "yanuarprayogat@gmail.com")

        return { success: true, message: "Ticket successfully created" };

    } catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return { success: false, message: "Ticket name must be unique." };
            }
        }

        if (error instanceof Error) {
            return { success: false, message: error.message };
        }

        return { success: false, message: "Internal server error." };
    }
};

export const softDeleteTicket = async (id: string): Promise<TicketReturn> => {
    try {
        const me = await getCurrentUser();
        if (!me.user?.id) {
            return { success: false, message: "UNAUTHENTICATED" };
        }

        await prisma.ticket.update({
            where: { id },
            data: {
                deleted: true,
            },
        });

        revalidatePath(TICKETS_ROUTE);

        return { success: true, message: "Ticket deleted successfully." };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "Internal server error." };
    }
};