
export type UserType = {
    id: string;
    name: string;
    email: string;
    imageUrl: string;
    role: RoleType
}

export type RoleType = {
    id: string;
    name: string;
}
export interface getUserReturn extends ActionResult {
    user?: UserType
}
export interface getUsersReturn extends ActionResult {
    users?: UserType[]
  }