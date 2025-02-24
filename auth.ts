import NextAuth, { Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { getUserByEmail, getUserById } from "./actions/user";
import prisma from "./lib/db";
import { JWT } from "next-auth/jwt";


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
      const { user } = await getUserByEmail(session.user.email as string)
      if (user && session.user) {
        session.user.id = user?.id as string;
      }

      if (user) {
        session.user.roles = user.roles;
      }
      console.log('user in db', { user })

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      return token;
    },

  },

  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
