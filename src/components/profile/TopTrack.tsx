'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

import PlaybackHandle from '@/components/playback/PlaybackHandle'
import { getTopTracks } from '@/server/api'
import { useProfileFilterStore } from 'store/useProfileFilter'

export default function TopTrack() {
  const term = useProfileFilterStore((state) => state.profileFilter)

  const { data } = useQuery({
    queryKey: ['topTracks', term],
    queryFn: () => getTopTracks(term, 12),
    suspense: true,
  })

  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 5xl:grid-cols-3">
      {data?.items.map((track) => (
        <li key={track.id} className="group flex flex-row items-center gap-5">
          <div className="relative flex flex-shrink-0 items-center justify-center">
            <Image
              src={track.album?.images?.[2]?.url || '/images/nocover.webp'}
              alt={track.name}
              width="0"
              height="0"
              sizes="100vw"
              className="h-14 w-14 rounded-md object-cover group-hover:blur-xs"
            />

            <PlaybackHandle uri={track.uri} queue={data.items.map((track) => track.uri)} />
          </div>

          <div className="flex flex-col">
            <Link href={`/track/${track.id}`} className="max-w-max text-white line-clamp-1 hover:underline">
              {track.name}
            </Link>
            <Link href={`/artist/${track.artists[0].id}`} className="max-w-max text-gray-400 line-clamp-1 hover:underline">
              {track.artists[0].name}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  )
}
