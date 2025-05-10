import { CategoryType } from "./category"
import { PriorityType } from "./priority"
import { ProjectType } from "./project"
import { StatusType } from "./status"
import { UserType } from "./user"

export type TicketDetailType = {
    asigness:UserType;
    
    
}

interface TicketDetailsReturn extends ActionResult {
    tickets?: TicketType[]
}

interface TicketDetailsReturn extends ActionResult {
    Tickets?: TicketType
}