
export type UserType = {
    id: string;
    name: string;
    email: string;
    imageUrl: string;
    roles: RoleType[]
}

export type RoleType = {
    id: string;
    name: string;
}

