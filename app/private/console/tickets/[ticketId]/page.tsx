export const dynamic = "force-dynamic";

import { ConsoleContainer } from "@/components/layouts/console-container"
import AppComment from "@/components/features/comment/app-comment"
import { TicketDetailSidebar } from "./tab-menu-components/ticket-detail-sidebar"
import { mapAndSort } from "@/lib/utils"
import { Suspense } from "react";
import { ConsoleWrapper } from "@/components/layouts/console-wrapper";
import { getTicketByid } from "@/@data/ticket";
import { getUsersTicketByTicketId } from "@/@data/ticket-assignee";
import { getParentCommentsByTicketId } from "@/@data/ticket-comment";
import { TicketDetailHeader } from "@/components/features/ticket-detail/ticket-detail-header";
import { getUsersByProjectId } from "@/@data/project";
interface IAssigmentRequestPage {
  params: Promise<{ ticketId: string }>
}


const DetailTicket = async ({ params }: IAssigmentRequestPage) => {
  const ticketId = (await params).ticketId; // ✅ Sudah benar, tidak perlu await

  const ticket = await getTicketByid(ticketId);
  const ticketUsers = await getUsersTicketByTicketId(ticketId);
  const ticketComments = await getParentCommentsByTicketId(ticketId);
  const ProjectUsers = await getUsersByProjectId(ticketId);

  if (!ticket.ticket || !ticketUsers.users) return "ERROR";

  console.log({ticket})
  // User ID yang sudah terdaftar pada tiket
  const assignedUserIds = ticketUsers.users.map(user => user.id);

  // Filter user yang belum terdaftar
  const unassignedUsers = ProjectUsers.users?.filter(
    user => !assignedUserIds.includes(user.id)
  );

  // Mapping dan sorting untuk ditampilkan di multiple selector
  const mappedUnassignedUsers = mapAndSort(
    unassignedUsers ?? [],
    user => user.name,
    user => user.id
  );

  return (
    <Suspense fallback={<div>Loading ticket...</div>}>

      <ConsoleContainer
      // className="flex"
      >
        {/* Main content */}

        <ConsoleWrapper
          className=" lg:w-9/12"
        >

          {/* Discussion header */}
          <TicketDetailHeader
            ticket={ticket.ticket}
          />

        

          <AppComment  ticketId={ticketId} parentComments={ticketComments.comments || []}/>
          {/* Reply box */}


        </ConsoleWrapper>

        {/* Mobile sidebar */}

        <ConsoleWrapper
          className=" lg:w-1/4"
        >

          <TicketDetailSidebar ticket={ticket.ticket} assignedUsers={ticketUsers.users} unnasignedUsersOptions={mappedUnassignedUsers} />
        </ConsoleWrapper>

      </ConsoleContainer>
    </Suspense>
  )
}
export default DetailTicket;
