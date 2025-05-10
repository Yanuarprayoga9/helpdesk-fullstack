"use server"

import { ITicketsShowParams, TicketShowType, TicketsReturn, TicketsShowReturn, TicketType } from "@/@types/ticket";
import { getUsersReturn } from "@/@types/user";
import { getCache, setCache } from "@/lib/redis";
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


// sort by 
/* 
    createdBy , category ,priority, status, 
*/
export const getTicketsShow = async ({ createdById, category, priority, status, projectId }: ITicketsShowParams): Promise<TicketsShowReturn> => {
    try {
        const tickets = await prisma.ticket.findMany({
            where: {
                deleted: false,
                ...(category && { name: { contains: category } }),
                ...(priority && { name: { contains: category } }),
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


export const getUsersTicketByTicketId = async (ticketId: string): Promise<getUsersReturn> => {
    const cacheKey = `ticket_users:${ticketId}`;

    // Cek cache dulu
    const cached = await getCache<getUsersReturn>(cacheKey);
    if (cached) return cached;

    try {
        const assigneeUsers = await prisma.ticketAssignee.findMany({
            where: {
                ticketId: ticketId
            },
            include: {
                user: {
                    include: {
                        role: true
                    }
                }
            }
        });

        const userMapped = assigneeUsers.map(assignee => assignee.user);
        const result: getUsersReturn = {
            success: true,
            users: userMapped
        };

        // Simpan ke cache
        await setCache(cacheKey, result, 60); // cache selama 1 menit

        return result;

    } catch (error) {
        return {
            success: false,
            message: "Failed to fetch users"
        };
    }
};


