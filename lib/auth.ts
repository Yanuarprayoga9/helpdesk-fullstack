import NextAuth, { Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import { JWT } from "next-auth/jwt";
import { RoleType } from "@/@types/user";
import { getUserById } from "@/actions/user";
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
    async signIn({ user }) {
      return true;
    },
    async session(args:any) {
      const { session, token } = args as { session: Session; token: JWT };

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (session.user && token) {
        session.user.roles = token?.roles as RoleType[];
      }
      return session;
    },
    async jwt({ token }) {
      const {user} = await getUserById(token.sub as string);
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
