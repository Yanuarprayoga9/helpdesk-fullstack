import NextAuth, { Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { getUserByEmail, getUserById } from "./actions/user";
import prisma from "./lib/db";
import { JWT } from "next-auth/jwt";


export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",  
    maxAge: 30 * 24 * 60 * 60, // 30 hari
    updateAge: 24 * 60 * 60, // Update setiap 24 jam
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      return true;
    },
    async session(args: any) {
      const { session,token } = args as { session: Session,token:JWT };
      console.log('user in session', { session })
      const { user } = await getUserById(token.sub as string)
      // if (user && session.user) {
      //   session.user.id = user?.id as string;
      // }

      // if (user) {
      //   session.user.roles = user.roles;
      // }
      console.log('user in db', { user })

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      return token;
    },

  },

  adapter: PrismaAdapter(prisma),
  ...authConfig,
});

