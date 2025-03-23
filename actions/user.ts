"use server"

import { hash } from "bcrypt-ts";
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
            return { success: false, error: "unauthenticated" };
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
                role: true
            },
        });
        if (!user) {
            return { success: false, error: "User not found" };
        }


        return { success: true, user: user };
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
                role: true
            },
        });
        if (!user) {
            return { success: false, error: "User not found" };
        }

        return { success: true, user: user };
    } catch (error) {
        console.error("Error fetching user by email:", error);
        return { success: false, error: (error as Error).message };
    }
};



export const updateUserById = async (
    id: string,
    data: any
): Promise<getUserReturn> => {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            return { success: false, error: "User not found" };
        }

        let updatedData: any = {
            name: data.name || user.name,
            imageUrl: data.imageUrl || user.imageUrl,
            roleId: data.roleId || user.roleId,
            deleted: data.deleted ?? user.deleted,
        };

        // Hash password jika ada perubahan
        if (data.password) {
            updatedData.password = await hash(data.password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: updatedData,
        });

        return { success: true, user: updatedUser };
    } catch (error) {
        console.error("Error updating user:", error);
        return { success: false, error: (error as Error).message };
    }
};
