"use server"

import {  ProjectsReturn } from "@/@types/project";
import {  UserType } from "@/@types/user";
import { projectSchema } from "@/schemas";
import { z } from "zod";
import prisma from "@/lib/db"
import { Prisma } from "@prisma/client";






export const createProject = async (
  values: z.infer<typeof projectSchema>
): Promise<ProjectsReturn> => {
  try {
    const parsedData = projectSchema.safeParse(values);
    if (!parsedData.success) {
      return { success: false, message: parsedData.error.errors[0].message };
    }

    const { name, imageUrl, userIds } = parsedData.data;

    console.log("Received userIds:", userIds); // Debugging

    // Cek apakah project dengan nama yang sama sudah ada
    const existingProject = await prisma.project.findFirst({
      where: { name },
    });

    if (existingProject) {
      return { success: false, message: "Project name must be unique." };
    }

    // Cek apakah semua user yang diberikan ada di database (jika userIds ada)
    let validUserIds: string[] = [];
    if (userIds && userIds.length > 0) {
      const users = await prisma.user.findMany({
        where: { id: { in: userIds } },
        select: { id: true },
      });

      validUserIds = users.map((user:UserType) => user.id);
      const missingUsers = userIds.filter((id) => !validUserIds.includes(id));

      if (missingUsers.length > 0) {
        return { success: false, message: `Users not found: ${missingUsers.join(", ")}` };
      }
    }

    // Buat project baru dengan users yang valid
    await prisma.project.create({
      data: {
        name,
        imageUrl,
        ProjectUser: validUserIds.length > 0 ? {
          create: validUserIds.map((userId) => ({ userId })),
        } : undefined, // 
      },
    });

    return { success: true, message: "Project successfully created" };
  } catch (error: unknown) {
    console.error("Error fetching project:", error);

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


