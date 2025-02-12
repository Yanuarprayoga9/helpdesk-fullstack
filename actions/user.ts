"use server"

import { auth } from "@/auth"
import prisma from "@/lib/db"

export const getCurrentUser = async () => {
    try {
        const session = await auth()
        return session?.user
    } catch (error) {
        return null
    }
}

export const getCurrentUserRole = async () => {
    try {
        const session = await auth()
        return session?.user?.role
    } catch (error) {
        return null
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({ where: { email } });

        return user;
    } catch {
        return null;
    }
};
export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        return user;
    } catch {

        return null;
    }
};
