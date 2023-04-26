'use client'

import FeatureItem from '@/components/analysis/FeatureItem'
import FeatureList from '@/components/analysis/FeatureList'
import { calculateTotalBars } from '@/utils/calculateTotalBars'
import { calculateTotalBeats } from '@/utils/calculateTotalBeats'
import { formatMusicKey } from '@/utils/formatMusicKey'

type Props = {
  trackAudioFeatures: SpotifyApi.AudioFeaturesResponse
}

export default function TrackAudioProgress({ trackAudioFeatures }: Props) {
  return (
    <FeatureList>
      <FeatureItem title="BPM" value={Math.round(trackAudioFeatures.tempo)} />
      <FeatureItem
        title="Bars"
        value={calculateTotalBars(trackAudioFeatures.duration_ms, trackAudioFeatures.tempo, trackAudioFeatures.time_signature)}
      />
      <FeatureItem title="Beats" value={calculateTotalBeats(trackAudioFeatures.duration_ms, trackAudioFeatures.tempo)} />
      <FeatureItem title="Signature" value={`${trackAudioFeatures.time_signature}/4`} />
      <FeatureItem title="Key" value={formatMusicKey(trackAudioFeatures.key)} />
      <FeatureItem title="Mode" value={trackAudioFeatures.mode ? 'Major' : 'Minor'} />
      <FeatureItem title="dB" value={trackAudioFeatures.loudness.toFixed(1)} />
    </FeatureList>
  )
}
