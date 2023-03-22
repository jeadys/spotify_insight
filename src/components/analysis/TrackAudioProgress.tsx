'use client'

import FeatureGrid from '@/components/analysis/FeatureGrid'
import FeatureItem from '@/components/analysis/FeatureItem'
import { calculateTotalBars, calculateTotalBeats, getMusicKeyOfTrack } from '@/lib/utils'

type Props = {
  trackAudioFeatures: SpotifyApi.AudioFeaturesResponse
}

export default function TrackAudioProgress({ trackAudioFeatures }: Props) {
  return (
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
  )
}
