import { getTicketsShow } from "@/actions/ticket";
import { ConsoleContainer } from "@/components/layouts/console-container";
import { ConsoleWrapper } from "@/components/layouts/console-wrapper";
import CategoriesMenu from "@/components/ticket/categories";
import { SearchFilters } from "@/components/ticket/search-filters";
import { TicketList } from "@/components/ticket/ticket-list";

export default async function TicketsPage() {
    const tickets = await getTicketsShow({ createdById: "1" })

    return (
        <ConsoleContainer
            title="Tickets"
            desc="Track and manage support tickets efficiently. View ticket statuses, priorities, and updates in real-time."

        >
            <ConsoleWrapper
                className="w-8/12"
            >
                <SearchFilters />

                <TicketList tickets={tickets.tickets || []} />
            </ConsoleWrapper>
            <ConsoleWrapper
                className="w-3/12"
            >
                <CategoriesMenu />

            </ConsoleWrapper>

        </ConsoleContainer>
    )
}
