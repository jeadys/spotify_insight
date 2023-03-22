'use client'

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'

const ChartNames = ['danceability', 'energy', 'speechiness', 'acousticness', 'valence', 'liveness'] as const

type ChartName = typeof ChartNames[number]

type ChartProps = {
  name: ChartName
  value: number
}

type Props = {
  trackAudioFeatures: SpotifyApi.AudioFeaturesResponse
}

export default function TrackAudioFeatureChart({ trackAudioFeatures }: Props) {
  const data: ChartProps[] = Object.entries(trackAudioFeatures)
    .filter(([name]) => ChartNames.includes(name as ChartName))
    .map(([name, value]) => ({ name: name as ChartName, value }))

  return (
    <div className="mx-auto w-full max-w-lg lg:max-w-none">
      <ResponsiveContainer width="100%">
        <RadarChart data={data} innerRadius={25}>
          <PolarGrid gridType="circle" stroke="#1f2937" />
          <PolarAngleAxis dataKey="name" tick={{ fill: 'white' }} style={{ textTransform: 'capitalize' }} />
          <Radar dataKey="value" fillOpacity={0.3} fill="#93c5fd" stroke="#60a5fa" strokeWidth={3} dot />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
