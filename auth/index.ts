import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
 
export const { handlers, signIn, signOut, auth } = NextAuth({providers: [
  Credentials({
    name: 'credentials',
    credentials: {
      username: { label: 'Login', type: 'text' },
      password: { label: 'Senha', type: 'password' },
    },
    type: 'credentials',
      async authorize(credentials) {
        if (credentials?.username && credentials?.password) {
          const { username, password } = credentials;
          const user = await prisma.user.findUnique({ where: { username: username.toString(), active: true } });
          if (user){
            const passwordMatch = await compare(password.toString(), user.password);
            if (passwordMatch) return {
              id: user.id,
              username: user.username,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              avatar: user.avatar,
              active: user.active
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
})