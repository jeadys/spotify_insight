import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import SpotifyProvider from 'next-auth/providers/spotify'
import { generateRandomString } from '@/lib/utils'

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!
const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET!
const state = generateRandomString(16)
const scope = `user-read-private user-read-email user-top-read 
               user-follow-read user-follow-modify user-library-read user-library-modify
               user-read-playback-state user-modify-playback-state streaming`

const queryParamsAuthorize = new URLSearchParams({
  client_id: clientId,
  response_type: 'code',
  state: state,
  scope: scope,
})

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
export async function refreshAccessToken(token: JWT) {
  try {
    const queryParamsRefresh = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken!,
    })

    const response = await fetch(`https://accounts.spotify.com/api/token?${queryParamsRefresh}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.error(error)

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    SpotifyProvider({
      clientId: clientId,
      clientSecret: clientSecret,
      authorization: `https://accounts.spotify.com/authorize?${queryParamsAuthorize.toString()}`,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at! * 1000, // expiry time in miliseconds
          user,
        }
      }

      // Return previous token if the access token has not yet expired
      if (token.accessTokenExpires) {
        if (Date.now() < token.accessTokenExpires) {
          return token
        }
      }

      // Access token has expired, so we need to refresh it...
      return await refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.error = token.error
      return session
    },
  },
}

export default NextAuth(authOptions)
