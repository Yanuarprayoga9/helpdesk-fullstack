import { ConsoleWrapper } from "@/components/layouts/console-wrapper"
import AppSideFilter from "@/components/features/ticket/side-filter/app-side-filter"
import { getCategories } from "@/@data/category"
import { mapAndSort } from "@/lib/utils"

import AppTickets from "@/components/features/ticket/app-ticket"
import { getTicketsShow } from "@/@data/ticket"
import AppTopFilter from "@/components/features/ticket/top-filter/app-top-filter"
import { getCurrentUser } from "@/@data/user"
import { TicketContainer } from "./components/tickets-container"
import { getProjects } from "@/@data/project"
import ProjectsMenu from "@/components/features/ticket/side-filter/projects"

interface TicketsPageProps {
    searchParams: Promise<{
        category?: string
        search?: string
        myticket?: string
        assigntome?: string
        priority?: string
        status?: string
        projectId?: string
    }>;
}

export default async function TicketsPage({ searchParams }: TicketsPageProps) {
    const category = (await searchParams).category
    const search = (await searchParams).search
    const priority = (await searchParams).priority
    const status = (await searchParams).status
    const projectId = (await searchParams).projectId
    const me = await getCurrentUser();
    const shouldFilterByMe = (await searchParams).myticket === "true"
    const shouldAssignToMe = (await searchParams).assigntome === "true"

    const tickets = await getTicketsShow({
        category: category,
        search: search,
        createdById: shouldFilterByMe ? me?.user?.id : undefined,
        assignedToMe: shouldAssignToMe,
        priority: priority,
        status: status,
        projectId: projectId
    })
    
    const { categories } = await getCategories(false)
    const { projects } = await getProjects(false)
    const categoryOptions = mapAndSort(categories, (cat) => cat.name, (cat) => cat.id)
    const projectOptions = mapAndSort(projects, (project) => project.name, (project) => project.id)

    return (
        <TicketContainer
            title="Tickets"
            desc="Track and manage support tickets efficiently. View ticket statuses, priorities, and updates in real-time."
            className="flex justify-between space-x-3 "
        >
            <div className="w-full">
                <AppTopFilter />
                <div className="flex space-x-3">
                    <ConsoleWrapper className="lg:w-10/12">
                        <AppTickets tickets={tickets.tickets || []} isConsole={false} />
                    </ConsoleWrapper>
                    <ConsoleWrapper className="lg:w-1/6">
                        <div className="space-y-4">
                            <AppSideFilter categoryOptions={categoryOptions} />
                            <ProjectsMenu projectOptions={projectOptions} />
                        </div>
                    </ConsoleWrapper>
                </div>
            </div>
        </TicketContainer>
    )
}