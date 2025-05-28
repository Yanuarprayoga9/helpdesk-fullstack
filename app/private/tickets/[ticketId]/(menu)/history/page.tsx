export const dynamic = "force-dynamic";

import { getTicketByid } from "@/@data/ticket";
import { getUsersTicketByTicketId } from "@/@data/ticket-assignee";
import { AppTab } from "../../@tab-menu/app-tab";
import { getHistories } from "@/@data/history";
import CardHistory from "./components/history-card";

interface IEditTicketPage {
  params: Promise<{ ticketId: string }>
}


const page = async ({ params }: IEditTicketPage) => {
  const ticketId = (await params).ticketId; // ✅ Sudah benar, tidak perlu await

  const ticket = await getTicketByid(ticketId);
  const ticketUsers = await getUsersTicketByTicketId(ticketId);

  if (!ticket.ticket || !ticketUsers.users) return "ERROR";

  // User ID yang sudah terdaftar pada tiket

  const historiesTicket = await getHistories(ticketId)
  // console.log({ historiesTicket })

  return (
    <AppTab assignedUsers={ticketUsers.users} pageName="history">
      <CardHistory histories={historiesTicket.histories || []} />
    </AppTab>

  )
}
export default page;
