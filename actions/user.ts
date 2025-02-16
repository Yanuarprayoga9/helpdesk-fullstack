"use server"

import { ProjectType } from "@/@types/project"
import {RoleType } from "@/@types/role"
import { UserType } from "@/@types/user"
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

export const getUserByEmail = async (email: string): Promise<UserType | null> => {
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
        console.log(user?.roles)
        if (!user) return null;
        return {
            ...user,
            roles: user.roles.map(userRole => userRole.role.name)
        };
    } catch {
        return null;
    }
};
export const getUserById = async (id: string): Promise<UserType | null> => {
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
        console.log({ user }, user?.roles)
        if (!user) return null;

        return {
            ...user,
            roles: user.roles.map(userRole => userRole.role.name)
        };
    } catch {
        return null;
    }
};
export const getUserRolesById = async (userId: string): Promise<RoleType[] | null> => {
    try {
        const userRoles = await prisma.userRole.findMany({
            where: { userId },
            include: {
                role: true, // Sertakan detail role
            },
        });

        // Jika tidak ditemukan role, kembalikan null
        if (!userRoles.length) {
            console.warn(`No roles found for userId: ${userId}`);
            return null;
        }

        // Ubah hasil menjadi array role
        const roles = userRoles.map((ur) => ({
            id: ur.role.id,
            name: ur.role.name,
        }));

        return roles;
    } catch {
        return null;
    }
};
