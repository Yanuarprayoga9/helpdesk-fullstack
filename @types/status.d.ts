
export type StatusType = {
    id: string
    name: string
    color: string
}

export interface StatusReturn extends ActionResult {
    status?: StatusType
}

export interface StatusesReturn extends ActionResult {
    statuses?: StatusType[]
}

