import { saltAndHashPassword } from "@/lib/utils"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        login: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null
        if (!credentials || !credentials.login || !credentials.password) return user;
        const pwHash = saltAndHashPassword(credentials.password)
        user = await getUserFromDb(credentials.login, pwHash)
        if (!user) {
          throw new Error("Invalid credentials.")
        }
        return user
      },
    }),
  ],
})