'use client'

import dayjs from 'dayjs'
import { TooltipProps } from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'

import { formatTrackDuration } from '@/utils/formatTrackDuration'

export const CustomScatterToolTip = ({ payload }: TooltipProps<ValueType, NameType>) => {
  if (payload && payload.length > 0) {
    const payloadMeta = payload[0].payload
    const payloadX = payload[0]
    const payloadY = payload[1]

    return (
      <div className=" flex max-w-xs flex-col gap-2 rounded-lg bg-gray-800 p-2 text-white">
        <div className="flex items-center gap-5 rounded-md">
          <div>
            <span className="line-clamp-1 max-w-max break-all">{payloadMeta.name}</span>
            <span className="line-clamp-1 max-w-max break-all">{payloadMeta.artist}</span>
          </div>
        </div>
        <hr className="border-white/20" />
        <p className="text-sm">
          <span className="font-semibold">{payloadX.name} </span>
          {payloadX.name === 'release' && dayjs.unix(Number(payloadX.value)).format('YYYY')}
          {payloadX.name === 'duration' && formatTrackDuration(Number(payloadX.value))}
          {payloadX.name !== 'release' && payloadX.name !== 'duration' && Number(payloadX.value).toFixed(2)}
        </p>
        <p className="text-sm">
          <span className="font-semibold">{payloadY.name} </span>
          {payloadY.name === 'release' && dayjs.unix(Number(payloadY.value)).format('YYYY')}
          {payloadY.name === 'duration' && formatTrackDuration(Number(payloadY.value))}
          {payloadY.name !== 'release' && payloadY.name !== 'duration' && Number(payloadY.value).toFixed(2)}
        </p>
      </div>
    )
  }

  return null
}
