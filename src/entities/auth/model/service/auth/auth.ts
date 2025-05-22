import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authSchema } from "../../validations/authSchema";
import { getUserByEmail } from "@/entities/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import NextAuth from "next-auth";

const config = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const validationData = authSchema.safeParse(credentials);

        if (!validationData.success) return null;

        const { email, password } = validationData.data;
        const user = await getUserByEmail(email);
        if (!user.success || !user.data) return null;

        const { password: hashedPassword } = user.data;
        const passwordMatch = bcrypt.compare(password, hashedPassword);
        if (!passwordMatch) return null;
        const { id, imageUrl, role } = user.data;
        return { id, email, role, image: imageUrl };
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      const isLogginIn = Boolean(auth?.user);

      if (!isLogginIn) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        token.role = user.role;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user = {
        ...session.user,
        email: token.email,
        id: token.userId,
        role: token.role,
      };
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers } = NextAuth(config);
