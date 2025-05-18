import { getTicketsShow } from "@/actions/ticket"
import { ConsoleContainer } from "@/components/layouts/console-container"
import { ConsoleWrapper } from "@/components/layouts/console-wrapper"
import AppSideFilter from "@/components/ticket/side-filter/app-side-filter"
import { SearchFilters } from "@/components/ticket/top-filter/search-filters"
import { getCategories } from "@/actions/category"
import { mapAndSort } from "@/lib/utils"

// ⬅️ import ini buat ambil searchParams
import AppTickets from "@/components/ticket/app-ticket"

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
        >
            <ConsoleWrapper className="w-8/12 flex flex-col space-y-4">
                <SearchFilters />
                <AppTickets tickets={tickets.tickets || []}/>
            </ConsoleWrapper>

            <ConsoleWrapper className="w-3/12">
                <AppSideFilter categoryOptions={categoryOptions} />
            </ConsoleWrapper>
        </ConsoleContainer>
    )
}
