import { ProgressBarGrid } from '@/components/analysis/ProgressBarGrid'
import { ProgressBarItem } from '@/components/analysis/ProgressBarItem'
import { getAlbumTracks } from '@/server/api/album'
import { calculateaverageAudioFeature } from '@/utils/calculateAverageAudioFeature'

type Props = {
  albumId: string
}

export const AlbumAudioFeature = async ({ albumId }: Props) => {
  const albumTracks = await getAlbumTracks(albumId, 50)
  if (!albumTracks?.items?.length) return <span className="text-white">No tracks to analyse</span>

  const tracks = albumTracks.items.map((track) => track.id)
  const totalTracks = albumTracks.total
  const trackAudioFeatures = await getAudioFeaturesForMultipleTracks(tracks)
  const averageAudioFeature = calculateaverageAudioFeature(trackAudioFeatures, totalTracks)

  return (
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
  )
}
