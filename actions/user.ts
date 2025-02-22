"use server"

import { RoleType } from "@/@types/role"
import { UserType } from "@/@types/user"
import { auth } from "@/auth"
import prisma from "@/lib/db"

interface getUserReturn extends ActionResult {
    data?: UserType
}
export const getCurrentUser = async (): Promise<getUserReturn> => {
    try {
        const session = await auth();
        if (!session?.user) {
            return { success: false, error: "unauthenticated" }; // Jika user tidak ada, return error
        }

        const user = session.user as UserType;
        if (!user.id) {
            return { success: false, error: "user not found" };
        }

        return { success: true, data: user };
    } catch (error) {
        console.error("Error fetching user:", error);
        return { success: false, error: (error as Error).message };
    }
};



export const getUserByEmail = async (email: string): Promise<getUserReturn> => {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                roles: {
                    include: { role: true },
                },
            },
        });
        if (!user) {
            return { success: false, error: "User not found" };
        }
        const userMapped: UserType = {
            ...user,
            roles: user.roles.map((role) => role.role)
        }

        return { success: true, data: userMapped };
    } catch (error) {
        console.error("Error fetching user by email:", error);
        return { success: false, error: (error as Error).message };
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                roles: true
            },
        });
        console.log({ user }, user?.roles)
        if (!user) return null;

        return {
            ...user,
        };
    } catch {
        return null;
    }
};
