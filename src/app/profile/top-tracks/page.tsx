import { Suspense } from 'react'

import SectionWrapper from '@/components/core/SectionWrapper'
import TrackGrid from '@/components/grid/TrackGrid'
import TrackGridSkeleton from '@/components/skeleton/TrackGridSkeleton'
import { getDoesUserHaveTrackSaved, getTopTracks } from '@/server/api'

export default async function TopTracks() {
  const topTracks = await getTopTracks('long_term', 50)
  const isTrackSaved = await getDoesUserHaveTrackSaved(topTracks.items.map((track) => track.id).join(','))

  return (
    <Suspense fallback={<TrackGridSkeleton amount={50} />}>
      <SectionWrapper title="Top tracks" timeRange={'short'}>
        <TrackGrid tracks={topTracks.items} isTrackSaved={isTrackSaved} />
      </SectionWrapper>
    </Suspense>
  )
}
