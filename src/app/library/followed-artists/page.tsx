import { Suspense } from 'react'

import SectionWrapper from '@/components/core/SectionWrapper'
import ArtistGrid from '@/components/grid/ArtistGrid'
import ArtistGridSkeleton from '@/components/skeleton/ArtistGridSkeleton'
import { getCurrentUserFollowedArtists } from '@/server/api'

export default async function FollowedArtists() {
  const followedArtists = await getCurrentUserFollowedArtists(50)

  return (
    <Suspense fallback={<ArtistGridSkeleton amount={50} />}>
      <SectionWrapper title="Followed artists">
        <ArtistGrid artists={followedArtists.artists.items} />
      </SectionWrapper>
    </Suspense>
  )
}
