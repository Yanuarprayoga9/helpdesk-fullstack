"use server"

// import prisma from "@/lib/db"
import { PrioritiesReturn } from "@/@types/priority";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


export const getPriorities = async (): Promise<PrioritiesReturn> => {
    try {


        const priorities = await prisma.priority.findMany({
        })

        if (!priorities) return { success: false, message: "Priorities not found" };

        return { success: true, priorities: priorities };

    } catch (error) {
        console.error("Error fetching Priorities:", error);
        return { success: false, message: (error as Error).message };
    }
}