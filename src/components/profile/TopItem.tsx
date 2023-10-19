'use client'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'

dayjs.extend(relativeTime)

type Props = {
  type: 'popularity' | 'release' | 'duration'
  title: string
  value: string
  trackName: string
  trackImage: string
  trackArtist: string
}

export const TopItem = ({ type, title, value, trackName, trackImage, trackArtist }: Props) => {
  return (
    <>
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <li className="flex items-center gap-5">
        <Image
          src={trackImage || '/images/nocover.webp'}
          alt={trackName}
          width="0"
          height="0"
          sizes="100vw"
          className="h-14 w-14 rounded-md object-cover"
        />

        <span>
          <h3 className="text-sm text-blue-300">
            {type == 'popularity' && <span>{value} score</span>}

            {type == 'release' && <span>{dayjs(value).fromNow()}</span>}

            {type == 'duration' && <span>{value}</span>}
          </h3>

          <h3 className="text-white">{trackName}</h3>
          <h4 className="text-gray-400">{trackArtist}</h4>
        </span>
      </li>
    </>
  )
}
