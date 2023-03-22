'use client'

import FeatureGrid from '@/components/analysis/FeatureGrid'
import FeatureItem from '@/components/analysis/FeatureItem'
import ProgressBarGrid from '@/components/analysis/ProgressBarGrid'
import ProgressBarItem from '@/components/analysis/ProgressBarItem'
import { calculateTotalBars, calculateTotalBeats, getMusicKeyOfTrack } from '@/lib/utils'

type Props = {
  trackAudioFeatures: SpotifyApi.AudioFeaturesResponse
}

export default function TrackAudioFeature({ trackAudioFeatures }: Props) {
  return (
    <>
      <ProgressBarGrid>
        <ProgressBarItem title="danceability" value={trackAudioFeatures.danceability} />
        <ProgressBarItem title="energy" value={trackAudioFeatures.energy} />
        <ProgressBarItem title="speechiness" value={trackAudioFeatures.speechiness} />
        <ProgressBarItem title="acousticness" value={trackAudioFeatures.acousticness} />
        <ProgressBarItem title="liveness" value={trackAudioFeatures.liveness} />
        <ProgressBarItem title="valence" value={trackAudioFeatures.valence} />
      </ProgressBarGrid>

      <FeatureGrid>
        <FeatureItem title="BPM" value={Math.round(trackAudioFeatures.tempo)} />
        <FeatureItem
          title="Bars"
          value={calculateTotalBars(trackAudioFeatures.duration_ms, trackAudioFeatures.tempo, trackAudioFeatures.time_signature)}
        />
        <FeatureItem title="Beats" value={calculateTotalBeats(trackAudioFeatures.duration_ms, trackAudioFeatures.tempo)} />
        <FeatureItem title="Signature" value={`${trackAudioFeatures.time_signature}/4`} />
        <FeatureItem title="Key" value={getMusicKeyOfTrack(trackAudioFeatures.key)} />
        <FeatureItem title="Mode" value={trackAudioFeatures.mode ? 'Major' : 'Minor'} />
        <FeatureItem title="dB" value={trackAudioFeatures.loudness.toFixed(1)} />
      </FeatureGrid>
    </>
  )
}
