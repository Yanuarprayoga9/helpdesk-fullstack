import { DefaultSession, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { RoleList } from "./constants";

export type ExtendedUser = DefaultSession["user"] & {
  roles: RoleList;
  id: string;

};
/** Example on how to extend the built-in session types */
declare module "next-auth" {
  interface Session {
    /** This is an example. You can find me in types/next-auth.d.ts */
    user: ExtendedUser;
  }
}

/** Example on how to extend the built-in types for JWT */
declare module "next-auth/jwt" {
  interface JWT {
    /** This is an example. You can find me in types/next-auth.d.ts */
    roles: RoleList;
    email:string;
  }
}