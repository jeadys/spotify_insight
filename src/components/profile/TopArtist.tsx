import Image from 'next/image'
import Link from 'next/link'

import { getTopArtists } from '@/server/api'

export default async function TopArtist() {
  const topArtists = await getTopArtists('short_term', 12)

  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 5xl:grid-cols-3">
      {topArtists.items.map((artist) => (
        <li className="flex flex-row items-center gap-5" key={artist.id}>
          <Link key={artist.id} href={`/artist/${artist.id}`} className="max-w-max text-white line-clamp-1 hover:underline">
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
            <Link key={artist.id} href={`/artist/${artist.id}`} className="max-w-max text-white line-clamp-1 hover:underline">
              {artist.name}
            </Link>

            {artist.genres[0] && (
              <Link
                key={artist.genres[0]}
                href={`/genre/${artist.genres[0]}`}
                className="max-w-max text-gray-400 line-clamp-1 hover:underline"
              >
                {artist.genres[0]}
              </Link>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
