import { Suspense } from 'react'

import SectionWrapper from '@/components/core/SectionWrapper'
import TrackGrid from '@/components/grid/TrackGrid'
import TrackGridSkeleton from '@/components/skeleton/TrackGridSkeleton'
import { getCurrentUserSavedTracks } from '@/server/api'

export default async function SavedTracks() {
  const savedTracks = await getCurrentUserSavedTracks(50)
  const isTrackSaved: boolean[] = Array(50).fill(true)

  return (
    <Suspense fallback={<TrackGridSkeleton amount={50} />}>
      <SectionWrapper title="Saved tracks">
        <TrackGrid tracks={savedTracks.items.map(({ track }) => track)} isTrackSaved={isTrackSaved} />
      </SectionWrapper>
    </Suspense>
  )
}
