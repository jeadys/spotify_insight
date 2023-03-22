import Section from '@/components/layout/Section'
import TrackList from '@/components/list/TrackList'
import { getRecommendationsForTracks, getTopTracks } from '@/server/api'

export default async function Recommendations({ params }: { params: { recommendationId: string } }) {
  const tracks = await getTopTracks(params.recommendationId, 50)
  const recommendations = await getRecommendationsForTracks(tracks.items, 50)

  return (
    <Section title="Recommendations" description="Based on profile">
      <TrackList tracks={recommendations.tracks.slice(0, 50)} />
    </Section>
  )
}
