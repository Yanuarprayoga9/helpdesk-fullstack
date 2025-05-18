"use server"

// import prisma from "@/lib/db"
import { StatusesReturn } from "@/@types/status";
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
type TicketStatus = "New" | "InProgress" | "Resolved" | "Reopened" | "Closed" | "OnHold";

function getTicketAction(status: TicketStatus): string {
  switch (status) {
    case "New":
      return "Take Ticket";
    case "InProgress":
      return "Resolve Ticket";
    case "Resolved":
      return "Close Ticket";
    case "Reopened":
      return "Re-Take Ticket";
    case "OnHold":
      return "Resume Ticket";
    default:
      return "No Action"; // For "Closed" or unknown
  }
}

export const getStatuses = async (): Promise<StatusesReturn> => {
    try {

        const statuses = await prisma.status.findMany({
        })

        if (!statuses) return { success: false, message: "statuses not found" };

        return { success: true, statuses: statuses };

    } catch (error) {
        console.error("Error fetching statuses:", error);
        return { success: false, message: (error as Error).message };
    }
}