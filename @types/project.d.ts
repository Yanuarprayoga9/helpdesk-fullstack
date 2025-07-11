import { UserType } from "./user";

export type ProjectType = {
    id: string;
    name: string;
    imageUrl?: string | null;
    createdAt: Date | string  ; 
    updatedAt: Date | string | null; 
};



export type ProjectUser = {
    projectId: string;
    users: UserType[]
}
export interface ProjectReturn extends ActionResult {
    project?: ProjectType
  }
export interface ProjectsReturn extends ActionResult {
    projects?: ProjectType[]
  }