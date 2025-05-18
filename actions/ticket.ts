"use server"

import { ITicketsShowParams, TicketReturn, TicketShowType, TicketsReturn, TicketsShowReturn, TicketType } from "@/@types/ticket";
import { getUsersReturn } from "@/@types/user";
import { getCache, setCache } from "@/lib/redis";
import { addAssigneesSchema, ticketSchema } from "@/schemas";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { getCurrentUser } from "./user";



const prisma = new PrismaClient();



export const getTickets = async (): Promise<TicketsReturn> => {
    try {
        const tickets = await prisma.ticket.findMany({
            include: {
                category: true,
                createdBy: {
                    include: {
                        role: true,
                    },
                },
                priority: true,
                status: true,
                project: true,
            },
        });


        //   / Mapping agar sesuai dengan tipe TicketType
        const mappedTickets: TicketType[] = tickets.map((ticket) => ({
            id: ticket.id,
            title: ticket.title,
            description: ticket.description,
            imageUrl: ticket.imageUrl,
            priority: ticket.priority,
            status: ticket.status,
            createdBy: ticket.createdBy,
            category: ticket.category,
            project: ticket.project,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt,
        }));

        return {
            success: true,
            tickets: mappedTickets,
        };
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return { success: false, message: "Failed to fetch tickets" };
    }
};


export const getTicketByid = async (id: string): Promise<TicketReturn> => {
    try {
        const ticket = await prisma.ticket.findUnique({
            where: {
                id
            },
            include: {
                category: true,
                createdBy: {
                    include: {
                        role: true,
                    },
                },
                priority: true,
                status: true,
                project: true,
            },
        });
        if (!ticket) return { success: false, message: "Failed to fetch tickets" };


        //   / Mapping agar sesuai dengan tipe TicketType
        const mappedTickets: TicketType = {
            id: ticket.id,
            title: ticket.title,
            description: ticket.description,
            imageUrl: ticket.imageUrl,
            priority: ticket.priority,
            status: ticket.status,
            createdBy: ticket.createdBy,
            category: ticket.category,
            project: ticket.project,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt,
        };

        return {
            success: true,
            ticket: mappedTickets,
        };
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return { success: false, message: "Failed to fetch tickets" };
    }
};


// sort by 
/* 
    createdBy , category ,priority, status, 
*/
export const getTicketsShow = async ({ createdById, category, priority, status, projectId }: ITicketsShowParams): Promise<TicketsShowReturn> => {
    try {
        const tickets = await prisma.ticket.findMany({
            where: {
                deleted: false,
                ...(category && { name: { contains: category } }),
                ...(priority && { name: { contains: category } }),
                ...(createdById && { createdById: createdById }),
                ...(projectId && { createdById: createdById }),
                ...(status && { name: { contains: category } })

            },
            include: {
                category: {
                    select: {
                        name: true
                    }
                },
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        role: {
                            select: {
                                name: true,
                            },
                        },
                    }
                },
                priority: {
                    select: {
                        color: true,
                        name: true
                    }
                },
                status: {
                    select: {
                        name: true,
                        color: true
                    }
                },
                project: {

                }
            }
        });

        const mappedTickets: TicketShowType[] = tickets.map((ticket) => ({
            id: ticket.id,
            title: ticket.title,
            description: ticket.description,
            priority: ticket.priority.name,
            priorityColor: ticket.priority.color,
            status: ticket.status.name,
            statusColor: ticket.status.color,
            createdBy: ticket.createdBy.name,
            createdByRole: ticket.createdBy.role.name,
            category: ticket.category.name,
            project: ticket.project.name,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt,
        }));

        return {
            success: true,
            tickets: mappedTickets,
        };
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return { success: false, message: "Failed to fetch tickets" };
    }
};


export const editTicket = async (
  id: string,
  values: Partial<z.infer<typeof ticketSchema>>
): Promise<TicketReturn> => {
  try {
    const me = await getCurrentUser();
    if (!me.user?.id) {
      return { success: false, message: "UNAUTHENTICATED" };
    }

    // Validasi input parsial (field tidak wajib semuanya)
    const parsedData = ticketSchema.partial().safeParse(values);
    if (!parsedData.success) {
      return { success: false, message: parsedData.error.errors[0].message };
    }

    const dataToUpdate: any = {};

    if (values.title !== undefined) dataToUpdate.title = values.title;
    if (values.description !== undefined) dataToUpdate.description = values.description;
    if (values.category !== undefined) dataToUpdate.categoryId = values.category;
    if (values.priority !== undefined) dataToUpdate.priorityId = values.priority;
    if (values.status !== undefined) dataToUpdate.statusId = values.status;
    if (values.project !== undefined) dataToUpdate.projectId = values.project;
    if (values.images?.[0]?.url !== undefined) dataToUpdate.imageUrl = values.images[0].url;

    // Jika tidak ada field yang ingin diubah
    if (Object.keys(dataToUpdate).length === 0) {
      return { success: false, message: "No fields to update." };
    }

    await prisma.ticket.update({
      where: { id },
      data: dataToUpdate,
    });

    return { success: true, message: "Ticket updated successfully." };

  } catch (error: any) {
    console.error("Error updating ticket:", error);

    if (error.code === "P2002") {
      return { success: false, message: "Ticket title must be unique." };
    }

    return { success: false, message: error.message || "Internal server error." };
  }
};

export const getUsersTicketByTicketId = async (ticketId: string): Promise<getUsersReturn> => {
    const cacheKey = `ticket_users:${ticketId}`;

    // Cek cache dulu
    const cached = await getCache<getUsersReturn>(cacheKey);
    if (cached) return cached;

    try {
        const assigneeUsers = await prisma.ticketAssignee.findMany({
            where: {
                ticketId: ticketId
            },
            include: {
                user: {
                    include: {
                        role: true
                    }
                }
            }
        });

        const userMapped = assigneeUsers.map(assignee => assignee.user);
        const result: getUsersReturn = {
            success: true,
            users: userMapped
        };

        // Simpan ke cache
        await setCache(cacheKey, result, 60); // cache selama 1 menit

        return result;

    } catch (error) {
        return {
            success: false,
            message: "Failed to fetch users"
        };
    }
};


export const createTicket = async (values: z.infer<typeof ticketSchema>): Promise<TicketReturn> => {
    try {
        const me = await getCurrentUser();
        if (!me.user?.id) {
            return { success: false, message: "UNAUTHENTICATED" };
        }
        // Validasi input dengan Zod
        const parsedData = ticketSchema.safeParse(values);
        if (!parsedData.success) {
            return { success: false, message: parsedData.error.errors[0].message };
        }
        await prisma.ticket.create({
            data: {
                title: values.title,
                description: values.description,
                assignees: {
                    create: values.assignees.map((userId) => ({
                        userId: userId,
                    })),
                },
                categoryId: values.category,
                priorityId: values.priority,
                statusId: values.status,
                imageUrl: values.images[0].url,
                projectId: values.project,
                createdById: me.user.id,
            }
        })

        return { success: true, message: "Ticket successfully created" };

    } catch (error: any) {
        console.error("Error creating category:", error);

        // Tangani error unik jika constraint unik di Prisma aktif
        if (error.code === "P2002") {
            return { success: false, message: "Ticket name must be unique." };
        }

        return { success: false, message: error.message };
    }
}

export const addAssignees = async (
  values: z.infer<typeof addAssigneesSchema>
): Promise<ActionResult> => {
  try {
    // Validasi input
    const parsedData = addAssigneesSchema.safeParse(values);
    if (!parsedData.success) {
      return { success: false, message: parsedData.error.errors[0].message };
    }

    const { ticketId, assignees } = parsedData.data;

    // Cek apakah ticket ada
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      return { success: false, message: "Ticket not found." };
    }

    // Tambahkan assignees baru
    await prisma.ticketAssignee.createMany({
      data: assignees.map(userId => ({
        ticketId,
        userId,
      })),
      skipDuplicates: true, // Hindari duplikasi (user yang sudah ditugaskan tidak ditambah ulang)
    });

    return { success: true, message: "Assigned users added successfully." };

  } catch (error: any) {
    console.error("Error adding assignees:", error);

    if (error.code === "P2002") {
      return { success: false, message: "User already assigned to this ticket." };
    }

    return { success: false, message: error.message || "Internal server error." };
  }
};
