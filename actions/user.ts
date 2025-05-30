"use server"

import { hash } from "bcrypt-ts";
import { getUserReturn, UserType } from "@/@types/user"
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache";
import { CONSOLE_USERS_ROUTE } from "@/constants/routes";

export const updateUserById = async (
  id: string,
  data: any
): Promise<getUserReturn> => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    let updatedData: any = {
      name: data.name || user.name,
      imageUrl: data.imageUrl || user.imageUrl,
      roleId: data.roleId || user.roleId,
      deleted: data.deleted ?? user.deleted,
    };

    // ✅ Hanya hash jika password ada dan tidak kosong string
    if (data.password && data.password.trim() !== "") {
      updatedData.password = await hash(data.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updatedData,
    });

    revalidatePath(`${CONSOLE_USERS_ROUTE}/${id}`);

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, message: (error as Error).message };
  }
};


export const createUser = async (data: any): Promise<getUserReturn> => {
    try {
        // Validasi data minimal
        if (!data.email || !data.password || !data.name || !data.roleId) {
            return { success: false, message: "Missing required fields" };
        }

        // Cek duplikat email
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            return { success: false, message: "Email already in use" };
        }

        // Hash password
        const hashedPassword = await hash(data.password, 10);

        const newUser = await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: hashedPassword,
                roleId: data.roleId,
                deleted: false,
            },
            include: {
                role: true,
            },
        });

        revalidatePath(CONSOLE_USERS_ROUTE);

        return { success: true, user: newUser };
    } catch (error) {
        console.error("Error creating user:", error);
        return { success: false, message: (error as Error).message };
    }
};



export const softDeleteUserById = async (
  id: string
): Promise<getUserReturn> => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    await prisma.user.update({
      where: { id },
      data: { deleted: true },
    });

    revalidatePath(CONSOLE_USERS_ROUTE);

    return { success: true };
  } catch (error) {
    console.error("Soft delete error:", error);
    return { success: false, message: (error as Error).message };
  }
}