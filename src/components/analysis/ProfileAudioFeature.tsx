import { ProgressBarGrid } from '@/components/analysis/ProgressBarGrid'
import { ProgressBarItem } from '@/components/analysis/ProgressBarItem'
import { TrackAudioFeatureScatter } from '@/components/analysis/TrackAudioFeatureScatter'
import { getAudioFeaturesForMultipleTracks, getTopTracks } from '@/server/api'
import { calculateaverageAudioFeature } from '@/utils/calculateAverageAudioFeature'
import { mergeTracksWithAudioFeatures } from '@/utils/mergeTracksWithAudioFeatures'

type Props = {
  timeRange: string
}

type Accumulator = {
  tracks: SpotifyApi.TrackObjectFull[]
  ids: string[]
}

export const ProfileAudioFeature = async ({ timeRange }: Props) => {
  const topTracks = await getTopTracks(timeRange, 50)
  if (!topTracks?.items?.length) return <span className="text-white">No tracks found</span>

  const { tracks, ids } = topTracks.items.reduce(
    (accumulator: Accumulator, track) => {
      if (track) {
        accumulator.tracks.push(track)
        accumulator.ids.push(track.id)
      }
      return accumulator
    },
    { tracks: [], ids: [] }
  )

  const totalTracks = topTracks.items.length
  const trackAudioFeatures = await getAudioFeaturesForMultipleTracks(ids)
  const averageAudioFeature = calculateaverageAudioFeature(trackAudioFeatures, totalTracks)
  const mergedTracksWithAudioFeatures = mergeTracksWithAudioFeatures(tracks, trackAudioFeatures)

  return (
    <>
      <ProgressBarGrid>
        <ProgressBarItem title="danceability" value={averageAudioFeature.danceability} />
        <ProgressBarItem title="energy" value={averageAudioFeature.energy} />
        <ProgressBarItem title="speechiness" value={averageAudioFeature.speechiness} />
        <ProgressBarItem title="acousticness" value={averageAudioFeature.acousticness} />
        <ProgressBarItem title="liveness" value={averageAudioFeature.liveness} />
        <ProgressBarItem title="valence" value={averageAudioFeature.valence} />
      </ProgressBarGrid>

      <TrackAudioFeatureScatter trackAudioFeatures={mergedTracksWithAudioFeatures} />
    </>
  )
}
