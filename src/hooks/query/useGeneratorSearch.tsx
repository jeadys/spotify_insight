import { useQuery } from '@tanstack/react-query'

import { getSearchSeeds } from '@/server/api'

/**
 *A custom React hook for fetching a user's top artists from the server, based on the current search term from the user's profile filter.
 *@returns The data object containing the top artists, as returned by the server.
 */
export default function useGeneratorSearch(debouncedSearch: string) {
  const { data, isInitialLoading } = useQuery({
    queryKey: ['debouncedSearch', debouncedSearch],
    queryFn: () => getSearchSeeds(debouncedSearch, 3),
    enabled: !!debouncedSearch,
  })

  return { data, isInitialLoading }
}
