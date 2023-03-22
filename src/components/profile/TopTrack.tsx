import { PlayIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'

import { getTopTracks } from '@/server/api'

export default async function TopTrack() {
  const topTracks = await getTopTracks('short_term', 12)

  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 5xl:grid-cols-3">
      {topTracks.items.map((track) => (
        <li className="group flex flex-row items-center gap-5" key={track.id}>
          <div className="relative flex flex-shrink-0 items-center justify-center">
            <Image
              src={track.album?.images?.[2]?.url || '/images/nocover.webp'}
              alt={track.name}
              width="0"
              height="0"
              sizes="100vw"
              className="h-14 w-14 rounded-md object-cover group-hover:blur-blur-xs"
            />

            <PlayIcon className="absolute hidden h-10 w-10 text-white hover:cursor-pointer group-hover:block" />
          </div>

          <div className="flex flex-col">
            <Link key={track.id} href={`/track/${track.id}`} className="max-w-max text-white line-clamp-1 hover:underline">
              {track.name}
            </Link>
            <Link
              key={track.artists[0].id}
              href={`/artist/${track.artists[0].id}`}
              className="max-w-max text-gray-400 line-clamp-1 hover:underline"
            >
              {track.artists[0].name}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  )
}
