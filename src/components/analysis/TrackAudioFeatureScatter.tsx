'use client'

import { useState } from 'react'

import { ArrowsRightLeftIcon } from '@heroicons/react/24/solid'
import { CartesianGrid, Label, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts'

import { CustomScatterFilter, ScatterSelectOption } from '@/components/analysis/CustomScatterFilter'
import { CustomScatterShape } from '@/components/analysis/CustomScatterShape'
import { CustomScatterToolTip } from '@/components/analysis/CustomScatterToolTip'
import { formatAxisLabel } from '@/utils/formatAxisLabel'

export type MergedTrackAndAudioFeatureObject = Partial<SpotifyApi.TrackLinkObject> & Partial<SpotifyApi.AudioFeaturesObject>

type Props = {
  trackAudioFeatures: MergedTrackAndAudioFeatureObject[]
}

export const TrackAudioFeatureScatter = ({ trackAudioFeatures }: Props) => {
  const [xAxis, setXAxis] = useState<ScatterSelectOption>('tempo')
  const [yAxis, setYAxis] = useState<ScatterSelectOption>('loudness')

  const strokeColor = '#60a5fa'
  const strokeOpacity = 0.2
  const strokeWidth = 0.5

  const swapFilterOption = () => {
    if (xAxis === yAxis) return
    setXAxis(yAxis)
    setYAxis(xAxis)
  }

  return (
    <>
      <div className="mx-auto my-5 flex max-w-md items-center justify-center gap-5 text-white">
        <label>X</label>
        <CustomScatterFilter axis={xAxis} setAxis={setXAxis} />
        <button
          onClick={() => swapFilterOption()}
          disabled={xAxis === yAxis}
          className="rounded-md bg-gray-800 p-2 disabled:cursor-not-allowed disabled:opacity-25"
        >
          <ArrowsRightLeftIcon className="h-6 w-6 " />
        </button>
        <CustomScatterFilter axis={yAxis} setAxis={setYAxis} />
        <label>Y</label>
      </div>

      <ResponsiveContainer width="90%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid stroke={strokeColor} strokeOpacity={strokeOpacity} strokeWidth={strokeWidth} radius={500} />

          <XAxis
            type="number"
            dataKey={xAxis}
            name={xAxis}
            tickFormatter={(tick) => formatAxisLabel(tick, xAxis)}
            axisLine={{ stroke: strokeColor, strokeOpacity: strokeOpacity, strokeWidth: strokeWidth }}
          >
            <Label value={`X - ${xAxis}`} position="bottom" style={{ textAnchor: 'middle' }} fill="#93c5fd" />
          </XAxis>

          <YAxis
            type="number"
            dataKey={yAxis}
            name={yAxis}
            tickFormatter={(tick) => formatAxisLabel(tick, yAxis)}
            axisLine={{ stroke: strokeColor, strokeOpacity: strokeOpacity, strokeWidth: strokeWidth }}
          >
            <Label angle={-90} value={`Y - ${yAxis}`} position="left" style={{ textAnchor: 'middle' }} fill="#93c5fd" />
          </YAxis>
          <Scatter data={trackAudioFeatures} shape={<CustomScatterShape />} />

          <Tooltip cursor={{ strokeDasharray: '2 2' }} content={<CustomScatterToolTip />} trigger="hover" />
        </ScatterChart>
      </ResponsiveContainer>
    </>
  )
}
