// app/[ticketId]/(menu)/layout.tsx
import { ReactNode, Suspense } from "react";
import { ConsoleContainer } from "@/components/layouts/console-container";
import { ConsoleWrapper } from "@/components/layouts/console-wrapper";
import { TicketDetailSidebar } from "../tab-menu/ticket-detail-sidebar";
import { getTicketByid } from "@/@data/ticket";
import { getUsersTicketByTicketId } from "@/@data/ticket-assignee";
import { mapAndSort } from "@/lib/utils";
import AppComment from "@/components/features/comment/app-comment";
import { getParentCommentsByTicketId } from "@/@data/ticket-comment";
import { TicketDetailHeader } from "@/components/features/ticket-detail/ticket-detail-header";
import { getUsersByProjectId } from "@/@data/project";

export const dynamic = "force-dynamic";

interface MenuLayoutProps {
    children: ReactNode;
    params: Promise<{ ticketId: string }>
}

export default async function MenuLayout({ children, params }: MenuLayoutProps) {
    const ticketId = (await params).ticketId; // ✅ Sudah benar, tidak perlu await
    const ticket = await getTicketByid(ticketId);
    // Early return with proper type checking
    if (!ticket.ticket || !ticket.ticket.project?.id) {
        return <div>ERROR: Ticket not found</div>;
    }

    const ticketUsers = await getUsersTicketByTicketId(ticketId);
    const ProjectUsers = await getUsersByProjectId(ticket.ticket?.project.id);
    const ticketComments = await getParentCommentsByTicketId(ticketId);

    if (!ticket.ticket || !ticketUsers.users) return "ERROR";

    const assignedUserIds = ticketUsers.users.map((user) => user.id);
    const unassignedUsers = ProjectUsers.users?.filter(
        (user) => !assignedUserIds.includes(user.id)
    );

    const mappedUnassignedUsers = mapAndSort(
        unassignedUsers ?? [],
        (user) => user.name,
        (user) => user.id
    );

    return (
        <Suspense fallback={<div>Loading layout...</div>}>
            <ConsoleContainer>
                <ConsoleWrapper className="lg:w-9/12">
                    <TicketDetailHeader
                        ticket={ticket.ticket}
                    />
                    {children}
                    <AppComment ticketId={ticketId} parentComments={ticketComments.comments || []} />

                </ConsoleWrapper>


                <ConsoleWrapper className="lg:w-1/4">
                    <TicketDetailSidebar
                        ticket={ticket.ticket}
                        assignedUsers={ticketUsers.users}
                        unnasignedUsersOptions={mappedUnassignedUsers}
                    />
                </ConsoleWrapper>
            </ConsoleContainer>
        </Suspense>
    );
}
