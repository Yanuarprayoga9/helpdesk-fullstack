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
            include: {
                    include: { role: true },
            },
        });

        if (!users.length) {
            return { success: false, error: "Users not found" };
        }

        const userMapped: UserType[] = users.map((user:any) => ({
            ...user,
        }));

        return { success: true, users: userMapped };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { success: false, error: (error as Error).message };
    }
};
