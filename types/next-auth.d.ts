import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
        id: string
        username: string
        email: string
        firstName: string
        lastName: string
        avatar: string | undefined
        active: boolean
    } & DefaultSession["user"]
  }
}