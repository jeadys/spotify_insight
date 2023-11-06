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
        <ul>
          <ProgressBarItem leftTitle="Unrhythmic" rightTitle="Danceable" value={averageAudioFeature.danceability} />
          <ProgressBarItem leftTitle="Electric" rightTitle="Acoustic" value={averageAudioFeature.acousticness} />
        </ul>
        <ul>
          <ProgressBarItem leftTitle="Relaxing" rightTitle="Energetic" value={averageAudioFeature.energy} />
          <ProgressBarItem leftTitle="Sad" rightTitle="Happy" value={averageAudioFeature.valence} />
        </ul>
        <ul>
          <ProgressBarItem leftTitle="Musical" rightTitle="Spoken" value={averageAudioFeature.speechiness} />
          <ProgressBarItem leftTitle="Studio" rightTitle="Live" value={averageAudioFeature.liveness} />
        </ul>
      </ProgressBarGrid>

      <TrackAudioFeatureScatter trackAudioFeatures={mergedTracksWithAudioFeatures} />
    </>
  )
}
