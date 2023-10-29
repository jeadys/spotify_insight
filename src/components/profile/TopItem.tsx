'use client'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import Link from 'next/link'

import { formatTrackDuration } from '@/utils/formatTrackDuration'

dayjs.extend(relativeTime)

type Props = {
  type: 'popularity' | 'release' | 'duration'
  title: string
  track: SpotifyApi.TrackObjectFull
}

export const TopItem = ({ type, title, track }: Props) => {
  return (
    <>
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <li className="flex items-center gap-5">
        <Image
          src={track.album.images?.[0]?.url || '/images/nocover.webp'}
          alt={track.name}
          width="0"
          height="0"
          sizes="100vw"
          className="h-14 w-14 rounded-md object-cover"
        />

        <span>
          <h3 className="text-sm text-blue-300">
            {type == 'popularity' && <span>{track.popularity / 10} score</span>}

            {type == 'release' && <span>{dayjs(track.album.release_date).fromNow()}</span>}

            {type == 'duration' && <span>{formatTrackDuration(track.duration_ms)}</span>}
          </h3>

          <span className="flex flex-col">
            <Link href={`/track/${track.id}`} className="line-clamp-1 max-w-max break-all text-white hover:underline">
              {track.name}
            </Link>
            <Link href={`/artist/${track.artists[0].id}`} className="line-clamp-1 max-w-max break-all text-gray-400 hover:underline">
              {track.artists[0].name}
            </Link>
          </span>
        </span>
      </li>
    </>
  )
}
