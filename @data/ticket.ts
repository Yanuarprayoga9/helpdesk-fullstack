"use server"

import { ITicketsShowParams, TicketReturn, TicketShowType, TicketsReturn, TicketsShowReturn, TicketType } from "@/@types/ticket";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Function to safely disconnect Prisma
const disconnectPrisma = async () => {
    try {
        await prisma.$disconnect();
    } catch {
        // Silent disconnect error
    }
};

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

        // Mapping agar sesuai dengan tipe TicketType
        const mappedTickets: TicketType[] = tickets.map((ticket) => ({
            id: ticket.id,
            title: ticket.title,
            backlog: ticket.backlog,

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
    } catch {
        return { success: false, message: "Failed to fetch tickets" };
    } finally {
        await disconnectPrisma();
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

        if (!ticket) {
            return { success: false, message: "Ticket not found" };
        }

        // Mapping agar sesuai dengan tipe TicketType
        const mappedTicket: TicketType = {
            id: ticket.id,
            backlog: ticket.backlog,
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
            ticket: mappedTicket,
        };
    } catch {
        return { success: false, message: "Failed to fetch ticket" };
    } finally {
        await disconnectPrisma();
    }
};

export const getTicketsShow = async ({
    assignedToMe,
    sortOrder = "desc",
    sortBy = "createdAt", // Parameter baru untuk menentukan field yang akan di-sort
    createdById,
    category,
    priority,
    status,
    projectId,
    categoryId,
    search
}: ITicketsShowParams): Promise<TicketsShowReturn> => {
    try {
        // Membuat objek orderBy berdasarkan sortBy parameter
        let orderBy: any = {};
        
        switch (sortBy) {
            case "project":
                orderBy = {
                    project: {
                        name: sortOrder === "asc" ? "asc" : "desc"
                    }
                };
                break;
            case "priority":
                orderBy = {
                    priority: {
                        name: sortOrder === "asc" ? "asc" : "desc"
                    }
                };
                break;
            case "status":
                orderBy = {
                    status: {
                        name: sortOrder === "asc" ? "asc" : "desc"
                    }
                };
                break;
            case "category":
                orderBy = {
                    category: {
                        name: sortOrder === "asc" ? "asc" : "desc"
                    }
                };
                break;
            case "title":
                orderBy = {
                    title: sortOrder === "asc" ? "asc" : "desc"
                };
                break;
            case "backlog":
                orderBy = {
                    backlog: sortOrder === "asc" ? "asc" : "desc"
                };
                break;
            case "createdAt":
            default:
                orderBy = {
                    createdAt: sortOrder === "asc" ? "asc" : "desc"
                };
                break;
        }

        const tickets = await prisma.ticket.findMany({
            where: {
                deleted: false,
                ...(search && {
                    OR: [
                        {
                            title: {
                                contains: search,
                            }
                        },
                        {
                            description: {
                                contains: search,
                            }
                        },
                    ],
                }),
                ...(assignedToMe && {
                    assignees: {
                        some: {
                            userId: createdById,
                            deleted: false,
                        },
                    },
                }),
                ...(categoryId && { categoryId }),
                ...(createdById && { createdById }),
                ...(projectId && { projectId }),
                ...(priority && { priority: { name: { contains: priority } } }),
                ...(status && { status: { name: { contains: status } } }),
                ...(category && { category: { name: { contains: category } } }),
            },
            orderBy: orderBy,
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
                project: true
            }
        });

        const mappedTickets: TicketShowType[] = tickets.map((ticket) => ({
            id: ticket.id,
            title: ticket.title,
            backlog: ticket.backlog,
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
    } catch {
        return { success: false, message: "Failed to fetch tickets" };
    } finally {
        await disconnectPrisma();
    }
};