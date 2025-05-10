import { CategoryType } from "./category"
import { PriorityType } from "./priority"
import { ProjectType } from "./project"
import { StatusType } from "./status"
import { UserType } from "./user"

export type TicketType = {
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

export type TicketShowType = {
    id: string
    title: string
    description: string
    priority: string
    priorityColor: string
    status: string;
    statusColor:string
    createdBy:string
    createdByRole:string
    category:string
    project:string
    createdAt:Date
    updatedAt:Date
}


export interface ITicketsShowParams  {
    createdById?: string ;
    category? : string ;
    priority?: string ;
    status?: string ;
    projectId?:string;
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
    Tickets?: TicketType
}