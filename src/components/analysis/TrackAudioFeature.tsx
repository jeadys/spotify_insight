import { FeatureItem } from '@/components/analysis/FeatureItem'
import { FeatureList } from '@/components/analysis/FeatureList'
import { ProgressBarItem } from '@/components/analysis/ProgressBarItem'
import { TrackAudioFeatureChart } from '@/components/analysis/TrackAudioFeatureChart'
import { getAudioFeaturesForTrack } from '@/server/api/track'
import { calculateTotalBars } from '@/utils/calculateTotalBars'
import { calculateTotalBeats } from '@/utils/calculateTotalBeats'
import { formatMusicKey } from '@/utils/formatMusicKey'

type Props = {
  trackId: string
}

export const TrackAudioFeature = async ({ trackId }: Props) => {
  const trackAudioFeatures = await getAudioFeaturesForTrack(trackId)
  if (!trackAudioFeatures) return <span className="text-white">No tracks to analyse</span>

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 text-sm md:grid-cols-2">
          <ul>
            <ProgressBarItem leftTitle="Unrhythmic" rightTitle="Danceable" value={trackAudioFeatures.danceability} />
            <ProgressBarItem leftTitle="Electric" rightTitle="Acoustic" value={trackAudioFeatures.acousticness} />
            <ProgressBarItem leftTitle="Relaxing" rightTitle="Energetic" value={trackAudioFeatures.energy} />
          </ul>
          <ul>
            <ProgressBarItem leftTitle="Sad" rightTitle="Happy" value={trackAudioFeatures.valence} />
            <ProgressBarItem leftTitle="Musical" rightTitle="Spoken" value={trackAudioFeatures.speechiness} />
            <ProgressBarItem leftTitle="Studio" rightTitle="Live" value={trackAudioFeatures.liveness} />
          </ul>
        </div>

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
      </div>
      <TrackAudioFeatureChart trackAudioFeatures={trackAudioFeatures} />
    </div>
  )
}
