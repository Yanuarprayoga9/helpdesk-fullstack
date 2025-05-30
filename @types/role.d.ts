
export type RoleType = {
    id: string
    name: string
}

export interface RoleReturn extends ActionResult {
    role?: StatusType
}

export interface RolesReturn extends ActionResult {
    roles?: StatusType[]
}

