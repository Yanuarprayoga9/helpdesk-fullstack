export const dynamic = "force-dynamic";

import { TicketDetailHeader } from "@/components/ticket-detail/header"
import { ConsoleContainer } from "@/components/layouts/console-container"
import AppComment from "@/components/comment/app-comment"

import { getUsers } from "@/@data/users"
import { mapAndSort } from "@/lib/utils"
import { Suspense } from "react";
import { ConsoleWrapper } from "@/components/layouts/console-wrapper";
import { getTicketByid } from "@/@data/ticket";
import { getUsersTicketByTicketId } from "@/@data/ticket-assignee";
import { getParentCommentsByTicketId } from "@/@data/ticket-comment";
import { AppTab } from "../components/tab-menu/app-tab";
import { MobileSidebar } from "../components/mobile-sidebar";
import { TicketDetailSidebar } from "../components/ticket-detail-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface IEditTicketPage {
  params: Promise<{ ticketId: string }>
}


const page = async ({ params }: IEditTicketPage) => {
  const ticketId = (await params).ticketId; 

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

          <AppTab assignedUsers={ticketUsers.users} pageName="team" >

            <div className="border rounded-md p-6">
              <h3 className="text-lg font-medium mb-4">Team Members</h3>
              {ticketUsers.users && ticketUsers.users.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ticketUsers.users.map((user, index) => (
                    <div
                      key={user?.id || index}
                      className="flex items-center gap-3 p-3 border rounded-md"
                    >
                      <Avatar>
                        <AvatarImage src={user?.imageUrl || ""} alt={user?.name || ""} />
                        <AvatarFallback>
                          {user?.name ? user.name.substring(0, 2).toUpperCase() : "UN"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user?.name || "Unknown User"}</div>
                        <div className="text-sm text-muted-foreground">
                          {user?.email || "No email"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  No team members yet
                </div>
              )}
            </div>
          </AppTab>

          <AppComment ticketId={ticketId} parentComments={ticketComments.comments || []} />
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
export default page;
