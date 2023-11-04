'use client'

import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from 'recharts'

type Props = {
  trackAudioFeatures: SpotifyApi.AudioFeaturesResponse
}

export const TrackAudioFeatureChart = ({ trackAudioFeatures }: Props) => {
  const data = [
    {
      name: 'danceability',
      value: trackAudioFeatures.danceability,
    },
    {
      name: 'energy',
      value: trackAudioFeatures.energy,
    },
    {
      name: 'speechiness',
      value: trackAudioFeatures.speechiness,
    },
    {
      name: 'acousticness',
      value: trackAudioFeatures.acousticness,
    },
    {
      name: 'liveness',
      value: trackAudioFeatures.liveness,
    },
    {
      name: 'valence',
      value: trackAudioFeatures.valence,
    },
  ]

  return (
    <div className="mx-auto h-80 w-80  max-w-lg sm:h-144 sm:w-144 lg:max-w-none">
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
