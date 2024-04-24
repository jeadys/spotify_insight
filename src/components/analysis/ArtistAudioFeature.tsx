import { ProgressBarGrid } from '@/components/analysis/ProgressBarGrid'
import { ProgressBarItem } from '@/components/analysis/ProgressBarItem'
import { getArtistTopTracks } from '@/server/api/artist'
import { getAudioFeaturesForMultipleTracks } from '@/server/api/track'
import { calculateaverageAudioFeature } from '@/utils/calculateAverageAudioFeature'

type Props = {
  artistId: string
}

export const ArtistAudioFeature = async ({ artistId }: Props) => {
  const artistTopTracks = await getArtistTopTracks(artistId)
  if (!artistTopTracks?.tracks?.length) return <span className="text-white">No tracks found</span>

  const tracks = artistTopTracks.tracks.map((track) => track.id)
  const totalTracks = artistTopTracks.tracks.length
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
