import { RequestAssignmentShowType, RequestAssignmentsShowTypeReturn } from "@/@types/ticket-assignment-request";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export const getAllRequestAssignments = async (): Promise<RequestAssignmentsShowTypeReturn> => {
  try {
    const requests = await prisma.ticketAssignmentRequest.findMany({
      orderBy: { requestedAt: "desc" },
      include: {
        requestedBy: true,
      },
    });

    const mapped: RequestAssignmentShowType[] = requests.map((req) => ({
      id: req.id,
      ticketId: req.ticketId,
      requestedById: req.requestedById,
      requestedBy: req.requestedBy.name,
      status: req.status,
      notes: req.notes || "",
      requestedAt: req.requestedAt,
    }));

    return { success: true, RequestAssignments: mapped };
  } catch (error) {
    return { success: false, message: "Failed to fetch request assignments" };
  }
};
export const getAllRequestAssignmentsByTicketId = async (ticketId:string): Promise<RequestAssignmentsShowTypeReturn> => {
  try {
    const requests = await prisma.ticketAssignmentRequest.findMany({
      where: {
        ticketId:ticketId
      },
      orderBy: { requestedAt: "desc" },
      include: {
        requestedBy: true,
      },
    });

    const mapped: RequestAssignmentShowType[] = requests.map((req) => ({
      id: req.id,
      ticketId: req.ticketId,
      requestedById: req.requestedById,
      requestedBy: req.requestedBy.name,
      status: req.status,
      notes: req.notes || "",
      requestedAt: req.requestedAt,
    }));

    return { success: true, RequestAssignments: mapped };
  } catch (error) {
    return { success: false, message: "Failed to fetch request assignments" };
  }
};