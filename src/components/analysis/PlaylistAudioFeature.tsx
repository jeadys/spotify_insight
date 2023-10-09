import ProgressBarGrid from '@/components/analysis/ProgressBarGrid'
import ProgressBarItem from '@/components/analysis/ProgressBarItem'
import { getAudioFeaturesForMultipleTracks, getPlaylistTracks } from '@/server/api'
import { calculateaverageAudioFeature } from '@/utils/calculateAverageAudioFeature'

type Props = {
  playlistId: string
}

export default async function PlaylistAudioFeature({ playlistId }: Props) {
  const playlistTracks = await getPlaylistTracks(playlistId, 100)
  if (!playlistTracks?.items?.length) return <span className="text-white">No tracks to analyse</span>

  const tracks = playlistTracks.items.map(({ track }) => track.id)
  const totalTracks = playlistTracks.total
  const trackAudioFeatures = await getAudioFeaturesForMultipleTracks(tracks)
  const averageAudioFeature = calculateaverageAudioFeature(trackAudioFeatures, totalTracks)

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
    </>
  )
}
