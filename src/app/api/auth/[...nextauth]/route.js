import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

export const authOptions = {
    providers: [
        SpotifyProvider({
          clientId: process.env.NEXT_PUBLIC_SPOTIFY_ID,
          clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_SECRET,
        })
      ],
      callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
          return true
        },
        async redirect({ url, baseUrl }) {
          return baseUrl
        },
        async session({ session, token, user }) {
        session.token = token.access_token
          return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if(account) {
                token.access_token = account.access_token
            }
          return token
        }
      }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }