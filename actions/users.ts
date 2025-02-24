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
                    roles: {
                        some: {
                            role: {
                                name: {
                                    contains: roleName, 
                                },
                            },
                        },
                    },
                }),
            },
            include: {
                roles: {
                    include: { role: true },
                },
            },
        });

        if (!users.length) {
            return { success: false, error: "Users not found" };
        }

        const userMapped: UserType[] = users.map((user) => ({
            ...user,
            roles: user.roles.map((role) => role.role),
        }));

        return { success: true, users: userMapped };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { success: false, error: (error as Error).message };
    }
};
