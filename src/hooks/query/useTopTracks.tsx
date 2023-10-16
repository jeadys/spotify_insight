'use client'

import { useQuery } from '@tanstack/react-query'

import { getTopTracks } from '@/server/api'
import { useProfileFilterStore } from '@/store/useProfileFilter'

/**
 *A custom React hook for fetching a user's top tracks from the server, based on the current search term from the user's profile filter.
 *@returns The data object containing the top tracks, as returned by the server.
 */
export const useTopTracks = () => {
  const term = useProfileFilterStore((state) => state.term)

  const { data } = useQuery({
    queryKey: ['topTracks', term],
    queryFn: () => getTopTracks(term, 12),
    suspense: true,
  })

  return data
}
