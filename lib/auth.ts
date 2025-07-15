import NextAuth, { Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import { JWT } from "next-auth/jwt";
import { UserType } from "@/@types/user";
import prisma from "./db";
import { LoginSchema } from "@/schemas";
import { comparePassword } from "./utils";


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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt(args: any) {
      const { token, user } = args as { token: JWT; user?: UserType };


      if (user) {

        token.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          imageUrl: user.imageUrl,
        };
      }

      return token;
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session(args: any) {
      const { session, token } = args as { session: Session; token: JWT };

      if (token.user) {
        session.user = token.user as UserType;
      }

      return session;
    },
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) return null;
        const { email, password } = validatedFields.data;

        interface UserAuthType extends UserType {
          password: string;
        }
        const user: UserAuthType = await prisma.user.findFirst({
          where: { email },
          include: { role: true },
        });

        if (!user || !user.password) return null;

        const isValidPassword = await comparePassword(password, user.password);
        if (!isValidPassword) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          imageUrl: user.imageUrl,
        };

      },
    }),
  ],
  // ...authConfig,
} satisfies NextAuthConfig);
