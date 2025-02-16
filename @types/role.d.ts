export type RolesType = string[];

export type RoleType = {
    id: string;
    name: string;
}

export enum Role {
    Developer = 'Developer',
    DevOps = 'DevOps',
    Admin = 'Admin',
    Manager = 'Manager'
}
