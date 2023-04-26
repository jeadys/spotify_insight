import { useQuery } from '@tanstack/react-query'

import { getTopArtists } from '@/server/api'
import { useProfileFilterStore } from 'store/useProfileFilter'

/**
 *A custom React hook for fetching a user's top artists from the server, based on the current search term from the user's profile filter.
 *@returns The data object containing the top artists, as returned by the server.
 */
export default function useTopArtists() {
  const term = useProfileFilterStore((state) => state.term)

  const { data } = useQuery({
    queryKey: ['topArtists', term],
    queryFn: () => getTopArtists(term, 12),
    suspense: true,
  })

  return data
}
