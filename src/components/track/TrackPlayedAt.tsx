'use client'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

type Props = {
  playedAt: string
}

export const TrackPlayedAt = ({ playedAt }: Props) => {
  return (
    <span className="ml-auto text-right text-sm text-white duration:hidden">
      {dayjs(playedAt).fromNow(true)} <span className="block sm:inline-block">ago</span>
    </span>
  )
}
