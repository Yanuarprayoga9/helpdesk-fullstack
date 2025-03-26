import { Header } from "@/components/header";
import CategoriesMenu from "@/components/ticket/categories";
import { SearchFilters } from "@/components/ticket/search-filters";
import { TicketList } from "@/components/ticket/ticket-list";

export default function TicketsPage() {
    return (
        <div className=" h-screen flex  bg-background ">
            <div className="w-full mx-auto   flex flex-col h-full">
                {/* Sticky Header Section */}
                <div className="w-full sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
                    <div className="p-4">
                        <Header
                            title="Tickets"
                            desc="Track and manage support tickets efficiently. View ticket statuses, priorities, and updates in real-time."
                        />
                        <SearchFilters />
                    </div>
                </div>

                <div className=" mx-auto w-full  flex h-full">
                    {/* Scrollable Content */}
                    <div className=" sm:min-w-3xl flex-1 overflow-auto">
                        <div className="p-4">
                            <TicketList />
                        </div>
                    </div>


                    {/* Sticky Footer */}
                    <div className="mx-auto max-w-3xl h-screen hidden  xl:block  ">

                        <div className="  sticky top-0 bg-background/80 backdrop-blur-sm border-b">
                            <div className="p-4">
                                <CategoriesMenu />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
