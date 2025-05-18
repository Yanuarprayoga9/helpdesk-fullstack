
export type StatusType = {
    id: string
    name: string
    color: string
}

export interface statusReturn extends ActionResult {
    statuses?: StatusType
}

export interface StatusesReturn extends ActionResult {
    statuses?: StatusType[]
}

