'use client'

import Image from 'next/image'
import Link from 'next/link'

import PlaybackHandle from '@/components/playback/PlaybackHandle'
import useTopTracks from '@/hooks/query/useTopTracks'

export default function TopTrack() {
  const topTracks = useTopTracks()
  if (!topTracks?.items?.length) return <span className="text-white">No tracks found</span>

  const trackQueue = topTracks.items.map((track) => track.uri)

  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 5xl:grid-cols-3">
      {topTracks.items.map((track) => (
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

            <PlaybackHandle uri={track.uri} queue={trackQueue} />
          </div>

          <span className="flex flex-col">
            <Link href={`/track/${track.id}`} className="line-clamp-1 max-w-max break-all text-white hover:underline">
              {track.name}
            </Link>
            <Link href={`/artist/${track.artists[0].id}`} className="line-clamp-1 max-w-max break-all text-gray-400 hover:underline">
              {track.artists[0].name}
            </Link>
          </span>
        </li>
      ))}
    </ul>
  )
}
