"use server"

import { HistoriesReturn, HistoriesShowReturn } from "@/@types/history";
import { PrismaClient } from "@prisma/client";


// import prisma from "@/lib/db"


const prisma = new PrismaClient()


export const getHistories = async (ticketId: string): Promise<HistoriesShowReturn> => {
    try {


        const histories = await prisma.ticketHistory.findMany({
            where: {
                ticketId: ticketId
            },
            include: {
                changedBy: {
                    select: {
                        name: true
                    }
                }
                ,
                oldStatus: {
                    select: {
                        name: true,
                        color: true,


                    }
                },
                newStatus: {
                    select: {
                        name: true,
                        color: true,


                    }
                },
            },
            orderBy: {
                changedAt: "desc"
            }
        })


        if (!histories) return { success: false, message: "Categories not found" };

        const historyMapped = histories.map((h) => (
            {
                id: h.id,
                ticketId: ticketId,
                changedByName: h.changedBy.name,
                oldStatus: h.oldStatus.name,
                newStatus: h.newStatus.name,
                action: h.action,
                changeNotes: h.changeNotes,
                changedAt: h.changedAt,

            }
        ))
        return { success: true, histories: historyMapped };

    } catch (error) {
        console.error("Error fetching categories:", error);
        return { success: false, message: (error as Error).message };
    }
}