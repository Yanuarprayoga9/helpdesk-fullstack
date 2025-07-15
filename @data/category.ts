"use server"

import { CategoriesReturn } from "@/@types/category"

import prisma from "@/lib/db"




export const getCategories = async (isDeleted: boolean): Promise<CategoriesReturn> => {
    try {


        const categories = await prisma.category.findMany({
            where: {
                deleted: isDeleted
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        if (!categories) return { success: false, message: "Categories not found" };

        return { success: true, categories: categories };

    } catch (error) {
        console.error("Error fetching categories:", error);
        return { success: false, message: (error as Error).message };
    }
}