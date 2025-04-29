
export type PriorityType = {
    id: string
    name: string
    color: string

}

export interface PrioritiesReturn extends ActionResult {
    priorities?: PriorityType[]
}

export interface PriorityReturn extends ActionResult {
    priorities?: PriorityType
}

