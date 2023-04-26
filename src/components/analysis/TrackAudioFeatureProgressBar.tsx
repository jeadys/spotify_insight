'use client'

import ProgressBarGrid from '@/components/analysis/ProgressBarGrid'
import ProgressBarItem from '@/components/analysis/ProgressBarItem'

type Props = {
  trackAudioFeatures: SpotifyApi.AudioFeaturesResponse
}

export default function TrackAudioFeatureProgressBar({ trackAudioFeatures }: Props) {
  return (
    <ProgressBarGrid>
      <ProgressBarItem title="danceability" value={trackAudioFeatures.danceability} />
      <ProgressBarItem title="energy" value={trackAudioFeatures.energy} />
      <ProgressBarItem title="speechiness" value={trackAudioFeatures.speechiness} />
      <ProgressBarItem title="acousticness" value={trackAudioFeatures.acousticness} />
      <ProgressBarItem title="liveness" value={trackAudioFeatures.liveness} />
      <ProgressBarItem title="valence" value={trackAudioFeatures.valence} />
    </ProgressBarGrid>
  )
}
