"use server"

import { getUsersReturn } from "@/@types/user";
import prisma from "@/lib/db";



export const getUsers = async (name?: string, roleName?: string): Promise<getUsersReturn> => {
    try {
        const users = await prisma.user.findMany({
            where: {
                deleted: false,
                ...(name && { name: { contains: name } }),
                ...(roleName && {
                    role: {
                        name: {
                            contains: roleName,
                        },

                    },
                }),
            },
                include: { role: true },
            
        });

        if (!users.length) {
            return { success: false, message: "Users not found" };
        }

       
        return { success: true, users:users};
    } catch (error: unknown) {
        console.error("Error fetching users:", error);
    
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
    
        return { success: false, message: "An unexpected error occurred." };
    }
};
