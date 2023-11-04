import { ProgressBarGrid } from '@/components/analysis/ProgressBarGrid'
import { ProgressBarItem } from '@/components/analysis/ProgressBarItem'
import { TrackAudioFeatureScatter } from '@/components/analysis/TrackAudioFeatureScatter'
import { getAudioFeaturesForMultipleTracks, getPlaylistTracks } from '@/server/api'
import { calculateaverageAudioFeature } from '@/utils/calculateAverageAudioFeature'
import { mergeTracksWithAudioFeatures } from '@/utils/mergeTracksWithAudioFeatures'

type Props = {
  playlistId: string
}

type Accumulator = {
  tracks: SpotifyApi.TrackObjectFull[]
  ids: string[]
}

export const PlaylistAudioFeature = async ({ playlistId }: Props) => {
  const playlistTracks = await getPlaylistTracks(playlistId, 100)
  if (!playlistTracks?.items?.length) return <span className="text-white">No tracks to analyse</span>

  const { tracks, ids } = playlistTracks.items.reduce(
    (accumulator: Accumulator, { track }) => {
      if (track) {
        accumulator.tracks.push(track)
        accumulator.ids.push(track.id)
      }
      return accumulator
    },
    { tracks: [], ids: [] }
  )

  const totalTracks = playlistTracks.total
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
