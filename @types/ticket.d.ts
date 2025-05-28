import { CategoryType } from "./category"
import { PriorityType } from "./priority"
import { ProjectType } from "./project"
import { StatusType } from "./status"
import { UserType } from "./user"

export type TicketType = {
    id: string
    title: string
    description: string;
    imageUrl: string | null;
    priority: PriorityType
    status: StatusType
    createdBy: UserType
    category: CategoryType
    project: ProjectType
    createdAt: Date
    updatedAt: Date | null
}

export type TicketShowType = {
    id: string
    title: string
    description: string
    priority: string
    priorityColor: string
    status: string;
    statusColor: string
    createdBy: string
    createdByRole: string
    category: string
    project: string
    createdAt: Date
    updatedAt: Date | null
}


export interface ITicketsShowParams {
    createdById?: string;
    category?: string;
    categoryId?: string;
    priority?: string;
    status?: string;
    projectId?: string;
    search?: string;
    sort?: string;
    labels?: string[];

}
export interface TicketsShowReturn extends ActionResult {
    tickets?: TicketShowType[]
}

export interface TicketShowReturn extends ActionResult {
    Tickets?: TicketShowType
}
export interface TicketsReturn extends ActionResult {
    tickets?: TicketType[]
}

export interface TicketReturn extends ActionResult {
    ticket?: TicketType
}




export interface TicketPayload {
    title: string;
    description: string;
    images: string[]
    assignees: string[]
    priority: string;
    status: string;
    project: string;
    category: string;
}