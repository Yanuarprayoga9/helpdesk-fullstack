import NextAuth, { Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authConfig from "./auth.config";
import { JWT } from "next-auth/jwt";
import { getUserById } from "./actions/user";

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
      const user = await getUserById( token.sub as string );
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (session.user && user) {
        session.user.role = user?.role;
      }
      if (user) {
        session.user.role = user.role;
        session.user.name = user.name;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub as string);
      if (user) {
        token.role = user.role;
      }
      console.log({ token });
      return token;
    },
  },

  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
