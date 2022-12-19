import type { DefaultSession as CustomSession } from 'next-auth'
import type { DefaultJWT as CustomJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  export interface Session extends CustomSession {
    accessToken?: string
    refreshToken?: string
    error?: string
  }
}

declare module 'next-auth/jwt' {
  export interface JWT extends CustomJWT {
    accessToken?: string
    refreshToken?: string
    error?: string
    accessTokenExpires?: number
  }
}
