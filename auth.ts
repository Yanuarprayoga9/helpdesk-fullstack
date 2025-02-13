import NextAuth, { Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authConfig from "./auth.config";
import { JWT } from "next-auth/jwt";
import { getUserById } from "./actions/user";
import { Role } from "./constants";

const prisma = new PrismaClient();

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      console.log({ user });
      return true;
    },
    async session(args: any) {
      const { session, token } = args as { session: Session; token: JWT };
      const user = await getUserById(token.sub as string);
      console.log('user in session', { user })
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (session.user && user) {
        session.user.roles = user.roles
          .map(role => role as Role) 
          .filter(role => Object.values(Role).includes(role)); 
      }


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
