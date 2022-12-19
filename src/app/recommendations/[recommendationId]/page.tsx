import SectionWrapper from '@/components/core/SectionWrapper'
import TrackGrid from '@/components/grid/TrackGrid'
import TrackGridSkeleton from '@/components/skeleton/TrackGridSkeleton'
import { getDoesUserHaveTrackSaved, getPlaylistById, getRecommendationsForTracks } from '@/server/api'

export default async function Recommendations({ params }: { params: { recommendationId: string } }) {
  const playlist = await getPlaylistById(params.recommendationId)
  const recommendations = await getRecommendationsForTracks(playlist.tracks.items, 50)
  const isTrackSaved = await getDoesUserHaveTrackSaved(recommendations.tracks.map((track) => track.id).join(''))

  return (
    <>
      {playlist && recommendations ? (
        <>
          <SectionWrapper title={`Recommendations based on ${playlist.name}`}>
            <TrackGrid tracks={recommendations.tracks.slice(0, 50)} isTrackSaved={isTrackSaved} />
          </SectionWrapper>
        </>
      ) : (
        <TrackGridSkeleton amount={50} />
      )}
    </>
  )
}
