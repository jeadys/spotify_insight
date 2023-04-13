'use client'

import { useQuery } from '@tanstack/react-query'

import GenreList from '@/components/list/GenreList'
import { getTopArtists } from '@/server/api'
import { useProfileFilterStore } from 'store/useProfileFilter'

export default function TopGenre() {
  const term = useProfileFilterStore((state) => state.profileFilter)

  const { data } = useQuery({
    queryKey: ['topArtists', term],
    queryFn: () => getTopArtists(term, 12),
    suspense: true,
  })

  return <GenreList genres={[...new Set(data?.items.flatMap((artist) => artist.genres))].slice(0, 12)} />
}
