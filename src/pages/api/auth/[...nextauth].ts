import axios from "axios";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";

import { LOGIN_URL } from "../../../lib/spotify";

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET!;

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
export async function refreshAccessToken(token: JWT) {
  try {
    const queryParams = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken as string,
    };

    const queryParamString = new URLSearchParams(queryParams);
    const REFRESH_URL = `https://accounts.spotify.com/api/token?${queryParamString}`;

    const response = await fetch(REFRESH_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    axios.defaults.baseURL = "https://api.spotify.com/v1";
    axios.defaults.headers.common["Authorization"] = `Bearer ${refreshedTokens.access_token}`;
    axios.defaults.headers.common["Content-Type"] = "application/json";

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    SpotifyProvider({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      authorization: LOGIN_URL,
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
        };
      }

      // Return previous token if the access token has not yet expired
      if (typeof token.accessTokenExpires === "number") {
        if (Date.now() < token.accessTokenExpires) {
          return token;
        }
      }

      // Access token has expired, so we need to refresh it...
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      axios.defaults.baseURL = "https://api.spotify.com/v1";
      axios.defaults.headers.common["Authorization"] = `Bearer ${token.accessToken}`;
      axios.defaults.headers.common["Content-Type"] = "application/json";

      return session;
    },
  },
};

export default NextAuth(authOptions);
