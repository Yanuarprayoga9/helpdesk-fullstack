import { ConsoleContainer } from "@/components/layouts/console-container"
import { ConsoleWrapper } from "@/components/layouts/console-wrapper"
import AppSideFilter from "@/components/features/ticket/side-filter/app-side-filter"
import { SearchFilters } from "@/components/features/ticket/top-filter/search-filters"
import { getCategories } from "@/@data/category"
import { mapAndSort } from "@/lib/utils"

// ⬅️ import ini buat ambil searchParams
import AppTickets from "@/components/features/ticket/app-ticket"
import { getTicketsShow } from "@/@data/ticket"

interface TicketsPageProps {
    searchParams:
    Promise<{ category: string }>

}

export default async function TicketsPage({ searchParams }: TicketsPageProps) {
    const category = (await searchParams).category

    const tickets = await getTicketsShow({
        // createdById: "1",
        categoryId: category, // kirim ke API kalau ada
    })

    const { categories } = await getCategories(false)
    const categoryOptions = mapAndSort(categories, (cat) => cat.name, (cat) => cat.id)

    return (
        <ConsoleContainer
            title="Tickets"
            desc="Track and manage support tickets efficiently. View ticket statuses, priorities, and updates in real-time."
            className="flex justify-between space-x-3 "
        >
            <div className="w-full">
                <SearchFilters />

                <div
                    className="flex  space-x-3 "

                >
                    <ConsoleWrapper
                        className="lg:w-8/12"

                    >
                        <AppTickets tickets={tickets.tickets || []} isConsole={false} />
                    </ConsoleWrapper>
                    <ConsoleWrapper
                        className="lg:w-1/4"

                    >
                        <AppSideFilter categoryOptions={categoryOptions} />
                    </ConsoleWrapper>
                </div>
            </div>

        </ConsoleContainer>
    )
}
