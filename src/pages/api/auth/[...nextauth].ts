import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import SpotifyProvider from 'next-auth/providers/spotify'

import { generateRandomString } from '@/utils/generateRandomString'

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!
const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET!
const state = generateRandomString(16)
const scope = `user-read-private user-read-email user-top-read 
               user-follow-read user-follow-modify user-library-read user-library-modify
               playlist-modify-public playlist-modify-private
               user-read-playback-state user-modify-playback-state streaming user-read-recently-played`

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
async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

    const requestBody = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken!,
    }).toString()

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: requestBody,
    })

    const data = await response.json()
    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + data.expires_in * 1000,
    }
  } catch (error) {
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
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at * 1000,
          id: account.userId,
          user,
        }
      }

      // Return previous token if the access token has not yet expired
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token
      }

      // Access token has expired, so we need to refresh it...
      // return await refreshAccessToken(token)
      const newToken = await refreshAccessToken(token)
      return newToken
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.error = token.error
      session.user.id = token.id
      session.user = token.user
      return session
    },
  },
}

export default NextAuth(authOptions)
