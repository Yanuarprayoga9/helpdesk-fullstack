export const dynamic = "force-dynamic";

import { ConsoleContainer } from "@/components/layouts/console-container"
import AppComment from "@/components/features/comment/app-comment"
import { MobileSidebar } from "./(menu)/components/mobile-sidebar"
import { TicketDetailSidebar } from "./(menu)/components/ticket-detail-sidebar"
import { getUsers } from "@/@data/users"
import { mapAndSort } from "@/lib/utils"
import { Suspense } from "react";
import { ConsoleWrapper } from "@/components/layouts/console-wrapper";
import { getTicketByid } from "@/@data/ticket";
import { getUsersTicketByTicketId } from "@/@data/ticket-assignee";
import { getParentCommentsByTicketId } from "@/@data/ticket-comment";
import { TicketDetailHeader } from "@/components/features/ticket-detail/ticket-detail-header";
interface IAssigmentRequestPage {
  params: Promise<{ ticketId: string }>
}


const AssigmentRequestPage = async ({ params }: IAssigmentRequestPage) => {
  const ticketId = (await params).ticketId; // ✅ Sudah benar, tidak perlu await

  const ticket = await getTicketByid(ticketId);
  const ticketUsers = await getUsersTicketByTicketId(ticketId);
  const ticketComments = await getParentCommentsByTicketId(ticketId);
  const allUsers = await getUsers();

  if (!ticket.ticket || !ticketUsers.users) return "ERROR";

  // User ID yang sudah terdaftar pada tiket
  const assignedUserIds = ticketUsers.users.map(user => user.id);

  // Filter user yang belum terdaftar
  const unassignedUsers = allUsers.users?.filter(
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
            category={ticket.ticket.category.name}
            createdBy={ticket.ticket.createdBy.name}
            title={ticket.ticket.title}
            id={ticket.ticket.id}
            createdAt={ticket.ticket.createdAt}
          />

        

          <AppComment  ticketId={ticketId} parentComments={ticketComments.comments || []}/>
          {/* Reply box */}


        </ConsoleWrapper>

        {/* Mobile sidebar */}
        <MobileSidebar />

        <ConsoleWrapper
          className=" lg:w-1/4"
        >

          {/* Sidebar with theme variables */}
          <TicketDetailSidebar ticket={ticket.ticket} assignedUsers={ticketUsers.users} unnasignedUsersOptions={mappedUnassignedUsers} />
        </ConsoleWrapper>

      </ConsoleContainer>
    </Suspense>
  )
}
export default AssigmentRequestPage;
