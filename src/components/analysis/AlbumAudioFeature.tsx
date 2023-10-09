import ProgressBarGrid from '@/components/analysis/ProgressBarGrid'
import ProgressBarItem from '@/components/analysis/ProgressBarItem'
import { getAlbumTracks, getAudioFeaturesForMultipleTracks } from '@/server/api'
import { calculateaverageAudioFeature } from '@/utils/calculateAverageAudioFeature'

type Props = {
  albumId: string
}

export default async function AlbumAudioFeature({ albumId }: Props) {
  const albumTracks = await getAlbumTracks(albumId, 50)
  if (!albumTracks?.items?.length) return <span className="text-white">No tracks to analyse</span>

  const tracks = albumTracks.items.map((track) => track.id)
  const totalTracks = albumTracks.total
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
