"use server"

import { UserType } from "@/@types/user";
import prisma from "@/lib/db";

interface getUsersReturn extends ActionResult {
    users?: UserType[];
}

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

       
        return { success: true, users};
    } catch (error) {
        console.error("Error fetching users:", error);
        return { success: false, message: (error as Error).message };
    }
};
