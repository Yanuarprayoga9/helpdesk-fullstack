import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";

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
    async session({ session }) {
      console.log({ session });
      return session;
    },
    async jwt({ token }) {
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
