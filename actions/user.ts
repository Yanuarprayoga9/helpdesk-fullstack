"use server"

import { UserType } from "@/@types/user"
import { auth } from "@/lib/auth";
import prisma from "@/lib/db"

interface getUserReturn extends ActionResult {
    user?: UserType
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

        return { success: true, user: user };
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
            roles: user.roles.map((role: any) => role.role)
        }

        return { success: true, user: userMapped };
    } catch (error) {
        console.error("Error fetching user by email:", error);
        return { success: false, error: (error as Error).message };
    }
};

export const getUserById = async (id: string): Promise<getUserReturn> => {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
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
            roles: user.roles.map((role: any) => role.role)
        }

        return { success: true, user: userMapped };
    } catch (error) {
        console.error("Error fetching user by email:", error);
        return { success: false, error: (error as Error).message };
    }
};
