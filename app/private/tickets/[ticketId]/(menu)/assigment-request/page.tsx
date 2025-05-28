export const dynamic = "force-dynamic";

import { Suspense } from "react";

import { getUsersTicketByTicketId } from "@/@data/ticket-assignee";
import { AppTab } from "../../@tab-menu/app-tab";

import RequestAssignmentsList from "./components/assigment-list";
import { getAllRequestAssignmentsByTicketId } from "@/@data/ticket-assignment-request";
interface IEditTicketPage {
  params: Promise<{ ticketId: string }>
}


const page = async ({ params }: IEditTicketPage) => {
  const ticketId = (await params).ticketId; // ✅ Sudah benar, tidak perlu await

  const ticketUsers = await getUsersTicketByTicketId(ticketId);

  const assignmentRequestsByTicketId = await getAllRequestAssignmentsByTicketId(ticketId)


  return (
    <Suspense fallback={<div>Loading ticket...</div>}>

      <AppTab assignedUsers={ticketUsers.users} pageName="assigment-request" >
        {/* <TicketDetailCard ticket={ticket.ticket} /> */}
        <RequestAssignmentsList requestAssignments={assignmentRequestsByTicketId.RequestAssignments || []}/>
      </AppTab>

    </Suspense>
  )
}
export default page;
