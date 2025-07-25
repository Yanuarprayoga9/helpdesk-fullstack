"use server"

import { getUsersReturn } from "@/@types/user";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsersTicketByTicketId = async (ticketId: string): Promise<getUsersReturn> => {
    // const cacheKey = `ticket_users:${ticketId}`;

    // // Cek cache dulu
    // const cached = await getCache<getUsersReturn>(cacheKey);
    // if (cached) return cached;

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


        return result;

    } catch {
        return {
            success: false,
            message: "Failed to fetch users"
        };
    }
};
