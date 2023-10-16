'use client'

import { useQuery } from '@tanstack/react-query'

import { getSearchSeeds } from '@/server/api'

/**
 *A custom React hook for fetching artists and tracks from the server, based on the current search term.
 *@returns The data object containing artists and tracks, as returned by the server.
 */
export const useGeneratorSearch = (debouncedSearch: string) => {
  const { data, isInitialLoading } = useQuery({
    queryKey: ['debouncedSearch', debouncedSearch],
    queryFn: () => getSearchSeeds(debouncedSearch, 3),
    enabled: !!debouncedSearch,
  })

  return { data, isInitialLoading }
}
