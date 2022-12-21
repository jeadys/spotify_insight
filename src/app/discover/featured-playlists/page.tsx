import { Suspense } from 'react'

import SectionWrapper from '@/components/core/SectionWrapper'
import PlaylistGrid from '@/components/grid/PlaylistGrid'
import PlaylistGridSkeleton from '@/components/skeleton/PlaylistGridSkeleton'
import { getFeaturedPlaylists } from '@/server/api'

export default async function FeaturedPlaylists() {
  const featured = await getFeaturedPlaylists(50)

  return (
    <Suspense fallback={<PlaylistGridSkeleton amount={50} />}>
      <SectionWrapper title="Featured playlists">
        <PlaylistGrid playlists={featured.playlists.items} />
      </SectionWrapper>
    </Suspense>
  )
}
