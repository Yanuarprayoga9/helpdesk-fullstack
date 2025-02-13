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
        return session?.user?.roles
    } catch (error) {
        return null
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                roles: {
                    include: {
                        role: true,
                    },
                },
            },
        });

        if (!user) return null;
        return {
            ...user,
            roles: user.roles.map(userRole => userRole.role.name)
        };
    } catch {
        return null;
    }
};
export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                roles: {
                    include: {
                        role: true,
                    },
                },
            },
        });
        console.log({user},'user in function')
        if (!user) return null;

        return {
            ...user,
            roles: user.roles.map(userRole => userRole.role.name)
        };
    } catch {

        return null;
    }
};
