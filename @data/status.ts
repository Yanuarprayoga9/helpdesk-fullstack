"use server"

// import prisma from "@/lib/db"
import { StatusesReturn, StatusReturn } from "@/@types/status";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
// ✅ Action Button Text Based on Ticket Status
// Ticket Status	Button Text
// New	Take Ticket
// InProgress	Resolve Ticket
// Resolved	Close Ticket
// Reopened	Retake Ticket
// OnHold	Resume Ticket
// Closed	(No action)

// ✅ Success Notifications
// Action	Notification Text
// Take Ticket	✅ Ticket has been successfully taken.
// Resolve Ticket	✅ Ticket has been resolved.
// Close Ticket	✅ Ticket has been closed.
// Resume Ticket	✅ Ticket has been resumed.
// Retake Ticket	✅ Ticket has been retaken.
// Cancel Ticket	❌ Ticket has been cancelled.
// export enum TicketStatus {
//     New = 'New',
//     InProgress = 'InProgress',
//     Escalated = 'Escalated',
//     Resolved = 'Resolved',
//     Reopened = 'Reopened',
//     Closed = 'Closed',
//     OnHold = 'OnHold'
// } 


export const getStatuses = async (name?: string): Promise<StatusesReturn> => {
  try {
    const statuses = await prisma.status.findMany({
      where: name ? { name: { contains: name } } : undefined,
    });

    if (!statuses || statuses.length === 0) {
      return { success: false, message: "Statuses not found" };
    }

    return { success: true, statuses };

  } catch (error) {
    console.error("Error fetching statuses:", error);
    return { success: false, message: (error as Error).message };
  }
};
export const getStatus = async (name?: string): Promise<StatusReturn> => {
  try {
    const status = await prisma.status.findFirst({
      where: name ? { name: { contains: name } } : undefined
    });

    if (!status) {
      return { success: false, message: "Status not found" };
    }

    return { success: true, status: status };

  } catch (error) {
    console.error("Error fetching status:", error);
    return { success: false, message: (error as Error).message };
  }
};
