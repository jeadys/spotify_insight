import { Suspense } from 'react'

import SectionWrapper from '@/components/core/SectionWrapper'
import TrackGrid from '@/components/grid/TrackGrid'
import TrackGridSkeleton from '@/components/skeleton/TrackGridSkeleton'
import { getPlaylistById, getRecommendationsForTracks } from '@/server/api'

export default async function Recommendations({ params }: { params: { recommendationId: string } }) {
  const playlist = await getPlaylistById(params.recommendationId)
  const recommendations = await getRecommendationsForTracks(playlist.tracks.items, 50)

  return (
    <Suspense fallback={<TrackGridSkeleton amount={50} />}>
      <SectionWrapper title={`Recommendations based on ${playlist.name}`}>
        <TrackGrid tracks={recommendations.tracks.slice(0, 50)} />
      </SectionWrapper>
    </Suspense>
  )
}
