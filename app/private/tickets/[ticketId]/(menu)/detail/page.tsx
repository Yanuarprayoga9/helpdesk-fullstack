// app/[ticketId]/(menu)/detail/page.tsx
import TicketDetailCard from "./components/ticket-detail-card";
import { getTicketByid } from "@/@data/ticket";
import { AppTab } from "../../tab-menu/app-tab";
import { getUsersTicketByTicketId } from "@/@data/ticket-assignee";

import { Metadata } from "next";

interface PageProps {
    params: Promise<{ ticketId: string }>

}

export const metadata: Metadata = {
  title: "Ticket Detail",
};

export default async function DetailPage({ params }: PageProps) {
  const ticketId = (await params).ticketId; // ✅ Sudah benar, tidak perlu await

  const ticket = await getTicketByid(ticketId);
  const ticketUsers = await getUsersTicketByTicketId(ticketId);
  if (!ticket.ticket || !ticketUsers.users) return "ERROR";

  return (
    <AppTab assignedUsers={ticketUsers.users} pageName="detail">
      <TicketDetailCard ticket={ticket.ticket} assignedUsers={ticketUsers.users} />
    </AppTab>
  );
}
