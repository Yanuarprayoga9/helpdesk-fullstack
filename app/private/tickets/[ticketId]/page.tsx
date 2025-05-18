export const dynamic = "force-dynamic";

import { TicketDetailHeader } from "@/components/ticket-detail/header"
import { ConsoleContainer } from "@/components/layouts/console-container"
import AppComment from "@/components/comment/app-comment"
import { MobileSidebar } from "./components/mobile-sidebar"
import { TicketDetailSidebar } from "./components/ticket-detail-sidebar"
import { AppTab } from "./components/app-tab"
import { getTicketByid, getUsersTicketByTicketId } from "@/actions/ticket"
import { getUsers } from "@/actions/users"
import { mapAndSort } from "@/lib/utils"
import { Suspense } from "react";
interface IEditTicketPage {
  params: Promise<{ ticketId: string }>
}


const page = async ({ params }: IEditTicketPage) => {

  const ticketId = (await params).ticketId; // ✅ Sudah benar, tidak perlu await

  const ticket = await getTicketByid(ticketId);
  const ticketUsers = await getUsersTicketByTicketId(ticketId);
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
        className="">
        {/* Main content */}
        <div className="  pb-24 lg:pb-0">
          <div className=" max-w-4xl px-4 py-6 ">
            {/* Discussion header */}
            <TicketDetailHeader
              category={ticket.ticket.category.name}
              createdBy={ticket.ticket.createdBy.name}
              title={ticket.ticket.title}
              id={ticket.ticket.id}
              createdAt={ticket.ticket.createdAt}
            />

            <AppTab ticket={ticket.ticket} assignedUsers={ticketUsers.users} />


            <AppComment />
            {/* Reply box */}

          </div>
        </div>

        {/* Mobile sidebar */}
        <MobileSidebar />
        {/* Sidebar with theme variables */}
        <TicketDetailSidebar assignedUsers={ticketUsers.users} unnasignedUsersOptions={mappedUnassignedUsers} />
      </ConsoleContainer>
    </Suspense>
  )
}
export default page;
