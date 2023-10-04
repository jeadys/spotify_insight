'use client'

import Image from 'next/image'
import Link from 'next/link'

import useTopArtists from '@/hooks/query/useTopArtists'

export default function TopArtist() {
  const topArtists = useTopArtists()
  if (!topArtists?.items?.length) return <span className="text-white">No artists found</span>

  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 5xl:grid-cols-3">
      {topArtists.items.map((artist) => (
        <li key={artist.id} className="flex flex-row items-center gap-5">
          <Link href={`/artist/${artist.id}`}>
            <Image
              src={artist.images?.[2]?.url || '/images/nocover.webp'}
              alt={artist.name}
              width="0"
              height="0"
              sizes="100vw"
              className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
            />
          </Link>

          <span className="flex flex-col">
            <Link href={`/artist/${artist.id}`} className="line-clamp-1 max-w-max text-white hover:underline">
              {artist.name}
            </Link>

            {artist.genres[0] && (
              <Link href={`/genre/${artist.genres[0]}`} className="line-clamp-1 max-w-max text-gray-400 hover:underline">
                {artist.genres[0]}
              </Link>
            )}
          </span>
        </li>
      ))}
    </ul>
  )
}
