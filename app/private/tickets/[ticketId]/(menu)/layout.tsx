// app/[ticketId]/(menu)/layout.tsx
import { ReactNode, Suspense } from "react";
import { ConsoleContainer } from "@/components/layouts/console-container";
import { ConsoleWrapper } from "@/components/layouts/console-wrapper";
import { MobileSidebar } from "./components/mobile-sidebar";
import { TicketDetailSidebar } from "../@tab-menu/ticket-detail-sidebar";
import { getUsers } from "@/@data/users";
import { getTicketByid } from "@/@data/ticket";
import { getUsersTicketByTicketId } from "@/@data/ticket-assignee";
import { mapAndSort } from "@/lib/utils";
import AppComment from "@/components/features/comment/app-comment";
import { getParentCommentsByTicketId } from "@/@data/ticket-comment";
import { TicketDetailHeader } from "@/components/features/ticket-detail/ticket-detail-header";

export const dynamic = "force-dynamic";

interface MenuLayoutProps {
    children: ReactNode;
    params: Promise<{ ticketId: string }>
}

export default async function MenuLayout({ children, params }: MenuLayoutProps) {
  const ticketId = (await params).ticketId; // ✅ Sudah benar, tidak perlu await
    const ticket = await getTicketByid(ticketId);
    const ticketUsers = await getUsersTicketByTicketId(ticketId);
    const allUsers = await getUsers();
    const ticketComments = await getParentCommentsByTicketId(ticketId);

    if (!ticket.ticket || !ticketUsers.users) return "ERROR";

    const assignedUserIds = ticketUsers.users.map((user) => user.id);
    const unassignedUsers = allUsers.users?.filter(
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
                        category={ticket.ticket.category.name}
                        createdBy={ticket.ticket.createdBy.name}
                        title={ticket.ticket.title}
                        id={ticket.ticket.id}
                        createdAt={ticket.ticket.createdAt}
                    />
                    {children}
                    <AppComment ticketId={ticketId} parentComments={ticketComments.comments || []} />

                </ConsoleWrapper>

                <MobileSidebar />

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
