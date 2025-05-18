"use server"

import { ITicketsShowParams, TicketReturn, TicketShowType, TicketsReturn, TicketsShowReturn, TicketType } from "@/@types/ticket";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export const getTickets = async (): Promise<TicketsReturn> => {
    try {
        const tickets = await prisma.ticket.findMany({
            include: {
                category: true,
                createdBy: {
                    include: {
                        role: true,
                    },
                },
                priority: true,
                status: true,
                project: true,
            },
        });


        //   / Mapping agar sesuai dengan tipe TicketType
        const mappedTickets: TicketType[] = tickets.map((ticket) => ({
            id: ticket.id,
            title: ticket.title,
            description: ticket.description,
            imageUrl: ticket.imageUrl,
            priority: ticket.priority,
            status: ticket.status,
            createdBy: ticket.createdBy,
            category: ticket.category,
            project: ticket.project,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt,
        }));

        return {
            success: true,
            tickets: mappedTickets,
        };
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return { success: false, message: "Failed to fetch tickets" };
    }
};

export const getTicketByid = async (id: string): Promise<TicketReturn> => {
    try {
        const ticket = await prisma.ticket.findUnique({
            where: {
                id
            },
            include: {
                category: true,
                createdBy: {
                    include: {
                        role: true,
                    },
                },
                priority: true,
                status: true,
                project: true,
            },
        });
        if (!ticket) return { success: false, message: "Failed to fetch tickets" };


        //   / Mapping agar sesuai dengan tipe TicketType
        const mappedTickets: TicketType = {
            id: ticket.id,
            title: ticket.title,
            description: ticket.description,
            imageUrl: ticket.imageUrl,
            priority: ticket.priority,
            status: ticket.status,
            createdBy: ticket.createdBy,
            category: ticket.category,
            project: ticket.project,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt,
        };

        return {
            success: true,
            ticket: mappedTickets,
        };
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return { success: false, message: "Failed to fetch tickets" };
    }
};

export const getTicketsShow = async ({ createdById, category, priority, status, projectId,categoryId }: ITicketsShowParams): Promise<TicketsShowReturn> => {
    try {
        const tickets = await prisma.ticket.findMany({
            where: {
                deleted: false,
                ...(category && { name: { contains: category } }),
                ...(priority && { name: { contains: category } }),
                ...(categoryId && { categoryId: categoryId }),
                ...(createdById && { createdById: createdById }),
                ...(projectId && { createdById: createdById }),
                ...(status && { name: { contains: category } })

            },
            include: {
                category: {
                    select: {
                        name: true
                    }
                },
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        role: {
                            select: {
                                name: true,
                            },
                        },
                    }
                },
                priority: {
                    select: {
                        color: true,
                        name: true
                    }
                },
                status: {
                    select: {
                        name: true,
                        color: true
                    }
                },
                project: {

                }
            }
        });

        const mappedTickets: TicketShowType[] = tickets.map((ticket) => ({
            id: ticket.id,
            title: ticket.title,
            description: ticket.description,
            priority: ticket.priority.name,
            priorityColor: ticket.priority.color,
            status: ticket.status.name,
            statusColor: ticket.status.color,
            createdBy: ticket.createdBy.name,
            createdByRole: ticket.createdBy.role.name,
            category: ticket.category.name,
            project: ticket.project.name,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt,
        }));

        return {
            success: true,
            tickets: mappedTickets,
        };
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return { success: false, message: "Failed to fetch tickets" };
    }
};

