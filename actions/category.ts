"use server"

import { CategoriesReturn, CategoryReturn, CategoryType } from "@/@types/category"
import { categorySchema } from "@/schemas";
import { z } from "zod";
import prisma from "@/lib/db"



export const createCategory = async (values: z.infer<typeof categorySchema>): Promise<CategoriesReturn> => {
    try {
        // Validasi input dengan Zod
        const parsedData = categorySchema.safeParse(values);
        if (!parsedData.success) {
            return { success: false, message: parsedData.error.errors[0].message };
        }

        // Cek apakah kategori dengan nama yang sama sudah ada
        const existingCategory = await prisma.category.findUnique({
            where: { name: values.name },
        });

        if (existingCategory) {
            return { success: false, message: "Category name must be unique." };
        }

        // Buat kategori baru
        await prisma.category.create({
            data: { name: values.name },
        });

        return { success: true, message: "Category successfully created" };
    } catch (error: any) {
        console.error("Error creating category:", error);

        // Tangani error unik jika constraint unik di Prisma aktif
        if (error.code === "P2002") {
            return { success: false, message: "Category name must be unique." };
        }

        return { success: false, message: error.message };
    }
};
// 🔹 UPDATE CATEGORY
export const updateCategoryById = async (id: string, values: z.infer<typeof categorySchema>): Promise<CategoryReturn> => {
    try {
        const parsed = categorySchema.safeParse(values);
        if (!parsed.success) return { success: false, message: parsed.error.errors[0].message };

        await prisma.category.update({
            where: { id },
            data: { name: values.name },
        });

        return { success: true, message: "category updated successfully" };
    } catch (error) {
        console.error("Error updating category:", error);
        return { success: false, message: "Failed to update category" };
    }
};
export const deteleCategory = async (id: string): Promise<CategoryReturn> => {
    try {


        const categories = await prisma.category.update({
            where: {
                id: id,
            },
            data: {
                deleted: true,
            },
        })

        if (!categories) return { success: false, message: "Categories not found" };

        return { success: true };

    } catch (error) {
        console.error("Error fetching categories:", error);
        return { success: false, message: (error as Error).message };
    }
}