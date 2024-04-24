'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/auth/[...nextauth]'

type FetchWrapperProps = {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  cache?: RequestCache
  body?: unknown
  tags?: string[]
}

export const fetchWrapper = async ({ url, method, cache = 'force-cache', body, tags }: FetchWrapperProps) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('No session available')
  }

  try {
    const requestOptions: RequestInit = {
      method: method,
      cache: cache,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`,
      },
    }

    if (body !== undefined) {
      requestOptions.body = JSON.stringify(body)
    }

    if (tags !== undefined) {
      requestOptions.next = { tags: tags }
    }

    const response = await fetch(url, requestOptions)

    if (!response.ok) throw new Error(`Request to ${url} resulted in a ${response.status}: ${response.statusText}`)

    return response.json()
  } catch (error) {
    if (error instanceof Error) {
      return console.error(error.message)
    }
  }
}
