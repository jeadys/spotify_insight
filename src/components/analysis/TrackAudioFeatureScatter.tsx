'use client'

import Image from 'next/image'
import { CartesianGrid, Label, ResponsiveContainer, Scatter, ScatterChart, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'

import { MergedTrackAndAudioFeatureObject } from './PlaylistAudioFeature'

type Props = {
  trackAudioFeatures: MergedTrackAndAudioFeatureObject[]
}

export const TrackAudioFeatureScatter = ({ trackAudioFeatures }: Props) => {
  const data = trackAudioFeatures.map((track) => ({
    loudness: track.audio_features.loudness,
    tempo: track.audio_features.tempo,
    name: track.name,
    artist: track.artists[0].name,
    image: track.album?.images?.[2]?.url || '/images/nocover.webp',
  }))

  console.log(trackAudioFeatures.slice(0, 1))

  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (payload && payload.length > 0) {
      const item = payload[0].payload // Get the data point
      return (
        <div className=" flex flex-col gap-2 rounded-lg bg-gray-800 p-2 text-white">
          <div className="flex items-center gap-5 rounded-md">
            <Image
              src={item.image || '/images/nocover.webp'}
              alt={item.name}
              width="0"
              height="0"
              sizes="100vw"
              className="h-10 w-10 rounded-md object-cover"
            />

            <div>
              <span className="line-clamp-1 max-w-max break-all">{item.name}</span>
              <span className="line-clamp-1 max-w-max break-all">{item.artist}</span>
            </div>
          </div>

          <p className="text-sm">
            <span className="font-semibold">BPM: </span>
            {Math.round(item.tempo)}
          </p>
          <p className="text-sm">
            <span className="font-semibold">dB: </span>
            {item.loudness.toFixed(1)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid stroke="#60a5fa" strokeOpacity={0.2} strokeWidth={0.5} />
          <XAxis type="number" dataKey="tempo" name="tempo">
            <Label offset={0} value="BPM" position="bottom" style={{ textAnchor: 'middle' }} fill="#93c5fd" fontWeight={600} />
          </XAxis>
          <YAxis type="number" dataKey="loudness" name="loudness">
            <Label angle={-90} offset={0} value="dB" position="left" style={{ textAnchor: 'middle' }} fill="#93c5fd" fontWeight={600} />
          </YAxis>
          <Tooltip cursor={{ strokeDasharray: '1 1' }} content={CustomTooltip} />
          <Scatter data={data} fill="#93c5fd" />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid stroke="#60a5fa" strokeOpacity={0.2} strokeWidth={0.5} />
          <XAxis type="number" dataKey="tempo" name="tempo">
            <Label offset={0} value="BPM" position="bottom" style={{ textAnchor: 'middle' }} fill="#93c5fd" fontWeight={600} />
          </XAxis>
          <YAxis type="number" dataKey="loudness" name="loudness">
            <Label angle={-90} offset={0} value="dB" position="left" style={{ textAnchor: 'middle' }} fill="#93c5fd" fontWeight={600} />
          </YAxis>
          <Tooltip cursor={{ strokeDasharray: '1 1' }} content={CustomTooltip} />
          <Scatter data={data} fill="#93c5fd" />
        </ScatterChart>
      </ResponsiveContainer>
    </>
  )
}
