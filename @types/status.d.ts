
export type StatusType = {
    id: string
    name: string
    color: string
}

export interface PrioritiesReturn extends ActionResult {
    priorities?: PriorityType[]
}

export interface StatusReturn extends ActionResult {
    status?: StatusType
}

