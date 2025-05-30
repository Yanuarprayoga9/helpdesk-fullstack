"use server"

import { RolesReturn } from "@/@types/role"

import prisma from "@/lib/db"




export const getRoles= async (): Promise<RolesReturn> => {
    try {


        const roles = await prisma.role.findMany({})

        if (!roles) return { success: false, message: "roles not found" };

        return { success: true, roles: roles };

    } catch (error) {
        console.error("Error fetching roles:", error);
        return { success: false, message: (error as Error).message };
    }
}