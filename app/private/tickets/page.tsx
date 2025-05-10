import {  getTicketsShow } from "@/actions/ticket";
import { ConsoleContainer } from "@/components/layouts/console-container";
import { ConsoleWrapper } from "@/components/layouts/console-wrapper";
import CategoriesMenu from "@/components/ticket/categories";
import { SearchFilters } from "@/components/ticket/search-filters";
import { TicketList } from "@/components/ticket/ticket-list";

export default async function TicketsPage() {
const tickets =await  getTicketsShow({createdById:"1"})
 
    return (
        <ConsoleContainer
            title="Tickets"
            desc="Track and manage support tickets efficiently. View ticket statuses, priorities, and updates in real-time."
            className="flex justify-center"
        >
            <ConsoleWrapper>
                <div className="w-full mx-auto   flex flex-col h-full">
                    {/* Sticky Header Section */}
                    <div className="w-full z-10 bg-background/80 backdrop-blur-sm border-b">

                        <SearchFilters />
                    </div>

                    <div className=" mx-auto w-full  flex h-full">
                        {/* Scrollable Content */}
                        <div className=" sm:min-w-3xl flex-1 overflow-auto">
                            <TicketList tickets={tickets.tickets || []}/>
                        </div>


                        {/* Sticky Footer */}
                        <div className="mx-auto max-w-3xl h-screen hidden  xl:block  ">

                            <div className="  sticky top-0 bg-background/80 backdrop-blur-sm border-b">
                                <CategoriesMenu />
                            </div>
                        </div>
                    </div>
                </div>
            </ConsoleWrapper>
        </ConsoleContainer>
    )
}
