"use server";

import { ProjectReturn, ProjectsReturn } from "@/@types/project";
import { projectSchema } from "@/schemas";
import { z } from "zod";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { CONSOLE_PROJECTS_ROUTE } from "@/constants/routes";

export const createProject = async (
  values: z.infer<typeof projectSchema>
): Promise<ProjectsReturn> => {
  try {
    const parsedData = projectSchema.safeParse(values);
    if (!parsedData.success) {
      return { success: false, message: parsedData.error.errors[0].message };
    }

    const { name, imageUrl, userIds } = parsedData.data;

    // Cek apakah project dengan nama yang sama sudah ada
    const existingProject = await prisma.project.findFirst({
      where: { name },
    });

    if (existingProject) {
      return { success: false, message: "Project name must be unique." };
    }

    // Cek apakah semua user yang diberikan ada di database (jika userIds ada)
    // let validUserIds: string[] = [];
    // if (userIds && userIds.length > 0) {
    //   const users = await prisma.user.findMany({
    //     where: { id: { in: userIds } },
    //     select: { id: true },
    //   });

    //   validUserIds = users.map((user: UserType) => user.id);
    //   const missingUsers = userIds.filter((id) => !validUserIds.includes(id));

    //   if (missingUsers.length > 0) {
    //     return { success: false, message: `Users not found: ${missingUsers.join(", ")}` };
    //   }
    // }

    // Buat project baru dengan users yang valid
    await prisma.project.create({
      data: {
        name,
        imageUrl,
        ProjectUser: userIds.length > 0 ? {
          create: userIds.map((userId) => ({ userId })),
        } : undefined,
      },
    });

    revalidatePath(`${CONSOLE_PROJECTS_ROUTE}`);

    return { success: true, message: "Project successfully created" };
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { success: false, message: "Project name must be unique." };
      }
    }

    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return { success: false, message: "An unexpected error occurred." };
  }
};

export const updateProjectById = async (
  id: string,
  values: z.infer<typeof projectSchema>
): Promise<ProjectReturn> => {
  try {
    const parsedData = projectSchema.safeParse(values);
    if (!parsedData.success) {
      return { success: false, message: parsedData.error.errors[0].message };
    }

    const { name, imageUrl, userIds } = parsedData.data;

    // Cek apakah project ada
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return { success: false, message: "Project not found" };
    }

    // Cek user yang valid
    // let validUserIds: string[] = [];
    // if (userIds && userIds.length > 0) {
    //   const users = await prisma.user.findMany({
    //     where: { id: { in: userIds } },
    //     select: { id: true },
    //   });

    //   validUserIds = users.map((u: UserType) => u.id);
    //   const missing = userIds.filter((id) => !validUserIds.includes(id));
    //   if (missing.length > 0) {
    //     return { success: false, message: `Users not found: ${missing.join(", ")}` };
    //   }
    // }

    // Update project
    await prisma.project.update({
      where: { id },
      data: {
        name,
        imageUrl,
        ProjectUser: {
          deleteMany: {}, // hapus relasi lama
          create: userIds.map((userId) => ({ userId })),
        },
      },
    });

    revalidatePath(`${CONSOLE_PROJECTS_ROUTE}/${id}`);
    return { success: true, message: "Project successfully updated" };
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { success: false, message: "Project name must be unique." };
    }

    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return { success: false, message: "An unexpected error occurred." };
  }
};