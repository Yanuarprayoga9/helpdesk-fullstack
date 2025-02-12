import { UserRole } from "@prisma/client";
import { DefaultSession, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
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
    role?: "ADMIN" | "USER" | "GUEST";
    email:string;
  }
}