import { CategoryType } from "./category"
import { PriorityType } from "./priority"
import { ProjectType } from "./project"
import { StatusType } from "./status"
import { UserType } from "./user"

export type TicketsType = {
    id: string
    title: string
    description: string
    priority: PriorityType
    status: StatusType
    createdBy:UserType
    category:CategoryType
    project:ProjectType
    createdAt:Date
    updatedAt:Date
}

interface TicketsReturn extends ActionResult {
    tickets?: TicketsType[]
}

interface TicketsReturn extends ActionResult {
    Tickets?: TicketsType
}