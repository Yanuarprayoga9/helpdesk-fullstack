"use server"

import { ProjectReturn, ProjectsReturn, ProjectType } from "@/@types/project";
import { getUsersReturn, UserType } from "@/@types/user";
import { projectSchema } from "@/schemas";
import { z } from "zod";
import prisma from "@/lib/db"
import { Prisma } from "@prisma/client";




export const getProjects = async (isDeleted: boolean): Promise<ProjectsReturn> => {
  try {


    const projects = await prisma.project.findMany({
      where: {
        deleted: isDeleted
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    if (!projects) return { success: false, message: "Projects not found" };

    return { success: true, projects: projects };

  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, message: (error as Error).message };
  }
}

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



export const getProjectById = async (id: string): Promise<ProjectReturn> => {
  try {
    const project = await prisma.project.findFirst({
      where: {
        id: id
      }
    })

    if (!project) return { success: false, message: "Project not found" };

    return { success: true, project: project };

  } catch (error) {
    console.error("Error fetching Project:", error);
    return { success: false, message: (error as Error).message };
  }
}


export const getUsersByProjectId = async (projectId: string): Promise<getUsersReturn> => {
  try {
    // Step 1: Ambil daftar userId dari project
    const projectUsers = await prisma.projectUser.findMany({
      where: { projectId },
      select: { userId: true } // Hanya ambil userId saja
    });

    if (!projectUsers.length) {
      return { success: false, message: "No users found for this project" };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userIds = projectUsers.map((pu:any) => pu.userId); // Ambil array userId

    // Step 2: Fetch user detail berdasarkan userIds
    const users = await prisma.user.findMany({
      where: { id: { in: userIds }, deleted: false },
      include: { role: true }
    });

    if (!users.length) {
      return { success: false, message: "Users not found" };
    }

    return { success: true, users: users };

  } catch (error: unknown) {
    console.error("Error fetching users by projectId:", error);

    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return { success: false, message: "An unexpected error occurred." };
  }
};
