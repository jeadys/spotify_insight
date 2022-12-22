import { Suspense } from 'react'

import SectionWrapper from '@/components/core/SectionWrapper'
import ArtistGrid from '@/components/grid/ArtistGrid'
import TrackGrid from '@/components/grid/TrackGrid'
import ArtistGridSkeleton from '@/components/skeleton/ArtistGridSkeleton'
import TrackGridSkeleton from '@/components/skeleton/TrackGridSkeleton'
import { getDoesUserHaveTrackSaved, getTopArtists, getTopTracks } from '@/server/api'

export default async function page() {
  const topArtists = await getTopArtists('long_term', 12)
  const topTracks = await getTopTracks('long_term', 12)
  const isTrackSaved = await getDoesUserHaveTrackSaved(topTracks.items.map((track) => track.id).join(','))

  return (
    <>
      <Suspense fallback={<ArtistGridSkeleton amount={12} />}>
        <SectionWrapper title="Top artists all time" seeAll="/profile/top-artists">
          <ArtistGrid artists={topArtists.items} />
        </SectionWrapper>
      </Suspense>

      <Suspense fallback={<TrackGridSkeleton amount={12} />}>
        <SectionWrapper title="Top tracks all time" seeAll="/profile/top-tracks">
          <TrackGrid tracks={topTracks.items} isTrackSaved={isTrackSaved} />
        </SectionWrapper>
      </Suspense>
    </>
  )
}
