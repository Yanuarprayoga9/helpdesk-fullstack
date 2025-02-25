import NextAuth, { Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import { JWT } from "next-auth/jwt";
import { RoleType, UserType } from "@/@types/user";
import prisma from "./db";
import { LoginSchema } from "@/schemas";


export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async session(args: any) {// eslint-disable-line @typescript-eslint/no-explicit-any
      const { session, token } = args as { session: Session; token: JWT };

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (session.user && token) {
        session.user.roles = token?.roles as RoleType[];
      }
      return session;
    },
    async jwt(args: any) {// eslint-disable-line @typescript-eslint/no-explicit-any
      const { user, token } = args as { user: UserType, token: JWT };

      if (user) {
        token.roles = user.roles;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) return null;
/* eslint-disable @typescript-eslint/no-unused-vars */
        const { email, password } = validatedFields.data;

        const user = await prisma.user.findFirst({
          where: { email },
          include: { roles: true },
        });

        if (!user || !user.password) return null;
        return user;
      },
    }),
  ],
  // ...authConfig,
} satisfies NextAuthConfig);
