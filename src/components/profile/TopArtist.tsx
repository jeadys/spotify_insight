'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

import { getTopArtists } from '@/server/api'
import { useProfileFilterStore } from 'store/useProfileFilter'

export default function TopArtist() {
  const term = useProfileFilterStore((state) => state.profileFilter)

  const { data } = useQuery({
    queryKey: ['topArtists', term],
    queryFn: () => getTopArtists(term, 12),
    suspense: true,
  })

  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 5xl:grid-cols-3">
      {data?.items.map((artist) => (
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

          <div className="flex flex-col">
            <Link href={`/artist/${artist.id}`} className="max-w-max text-white line-clamp-1 hover:underline">
              {artist.name}
            </Link>

            {artist.genres[0] && (
              <Link href={`/genre/${artist.genres[0]}`} className="max-w-max text-gray-400 line-clamp-1 hover:underline">
                {artist.genres[0]}
              </Link>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
