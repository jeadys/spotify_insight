import { Suspense } from 'react'

import SectionWrapper from '@/components/core/SectionWrapper'
import TrackGrid from '@/components/grid/TrackGrid'
import TrackGridSkeleton from '@/components/skeleton/TrackGridSkeleton'
import { getTopTracks } from '@/server/api'

export default async function TopTracks() {
  const topTracks = await getTopTracks('long_term', 50)

  return (
    <Suspense fallback={<TrackGridSkeleton amount={50} />}>
      <SectionWrapper title="Top tracks" timeRange={'short'}>
        <TrackGrid tracks={topTracks.items} />
      </SectionWrapper>
    </Suspense>
  )
}
