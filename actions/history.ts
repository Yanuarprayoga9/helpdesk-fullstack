"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "@/@data/user"
import { TICKETS_ROUTE } from "@/constants/routes"
import { HistoryReturn } from "@/@types/history"

export const createHistory = async (
  data: {
    ticketId: string
    oldStatusId: string
    newStatusId: string
    changeNotes: string
    action?: string
  }
): Promise<HistoryReturn> => {
  try {
    const me = await getCurrentUser();
    console.log({data},me.user?.id)
    const history = await prisma.ticketHistory.create({
      data: {
        ticketId: data.ticketId,
        changedById: me.user?.id,
        oldStatusId: data.oldStatusId,
        newStatusId: data.newStatusId,
        changeNotes: data.changeNotes,
        action: "changeStatus",

      },
    })

    // Revalidate path kalau mau (opsional)
    
    revalidatePath(`${TICKETS_ROUTE}/${data.ticketId}/detail`)
    return { success: true, history }
  } catch (error) {
    console.error("Error creating ticket history:", error)
    return { success: false, message: (error as Error).message }
  }
}
