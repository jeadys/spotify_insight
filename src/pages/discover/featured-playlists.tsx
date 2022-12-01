import { useQuery } from '@tanstack/react-query'

import { SectionWrapper } from '../../components/core'
import { PlaylistGrid } from '../../components/grid'
import { PlaylistGridSkeleton } from '../../components/skeleton'
import type { IFeaturedPlaylists } from '../../lib/interfaces/featured-playlists'
import { getFeaturedPlaylists } from '../../lib/spotify'

export default function FeaturedPlaylists() {
  const fetchFeaturedPlaylists = async () => {
    const featuredPlaylists = await getFeaturedPlaylists(50)
    return featuredPlaylists.data
  }

  const { data: featured } = useQuery<IFeaturedPlaylists>(['all-featured-playlists'], fetchFeaturedPlaylists, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  return (
    <>
      {featured ? (
        <>
          <SectionWrapper title="Featured playlists" breadcrumb="true">
            <PlaylistGrid items={featured.playlists.items} />
          </SectionWrapper>
        </>
      ) : (
        <PlaylistGridSkeleton amount={50} />
      )}
    </>
  )
}
