import NextAuth, { Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { JWT } from "next-auth/jwt";
import { getUserByEmail, getUserById } from "./actions/user";
import { Role } from "./constants";
import prisma from "./lib/db";
import { UserType } from "./@types/user";


export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      return true;
    },
    async session(args: any) {
      const { session } = args as { session: Session };
      console.log('user in session', { session })
      const { data: user } = await getUserByEmail(session.user.email as string)
      if (session.user.email && session.user) {
        session.user.id = user?.id as string;
      }

      if (user) {
        session.user.roles = user.roles;
      }
      console.log('user in session', { session })

      return session;
    },

  },

  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
