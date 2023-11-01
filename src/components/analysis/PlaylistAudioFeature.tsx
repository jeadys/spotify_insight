import { ProgressBarGrid } from '@/components/analysis/ProgressBarGrid'
import { ProgressBarItem } from '@/components/analysis/ProgressBarItem'
import { TrackAudioFeatureScatter } from '@/components/analysis/TrackAudioFeatureScatter'
import { getAudioFeaturesForMultipleTracks, getPlaylistTracks } from '@/server/api'
import { calculateaverageAudioFeature } from '@/utils/calculateAverageAudioFeature'

type Props = {
  playlistId: string
}

export interface MergedTrackAndAudioFeatureObject extends SpotifyApi.TrackObjectFull {
  audio_features: SpotifyApi.AudioFeaturesObject
}

export const PlaylistAudioFeature = async ({ playlistId }: Props) => {
  const playlistTracks = await getPlaylistTracks(playlistId, 100)
  if (!playlistTracks?.items?.length) return <span className="text-white">No tracks to analyse</span>

  const tracks = playlistTracks.items.map(({ track }) => track.id)
  const totalTracks = playlistTracks.total
  const trackAudioFeatures = await getAudioFeaturesForMultipleTracks(tracks)
  const averageAudioFeature = calculateaverageAudioFeature(trackAudioFeatures, totalTracks)
  trackAudioFeatures.audio_features

  const mergePlaylistTracksWithAudioFeatures: MergedTrackAndAudioFeatureObject[] = playlistTracks.items.map(({ track }) => {
    const audioFeatures = trackAudioFeatures.audio_features.find((audioFeature) => audioFeature.id === track.id)
    return {
      ...track,
      audio_features: audioFeatures!,
    }
  })

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

      <div className="mt-5 flex flex-col gap-5 md:flex-row">
        <TrackAudioFeatureScatter trackAudioFeatures={mergePlaylistTracksWithAudioFeatures} />
      </div>
    </>
  )
}
