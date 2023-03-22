'use client'

import Image from 'next/image'
import Link from 'next/link'

import DiscoverButton from '@/components/ui/button/DiscoverButton'
import Label from '@/components/ui/Label'
import { formatFollowCount } from '@/lib/utils'

type Props = {
  artists: SpotifyApi.ArtistObjectFull[]
}

export default function TopArtist({ artists }: Props) {
  if (!artists?.length) return <DiscoverButton titleMessage="No artists found" buttonMessage="Discover new artists here" />

  return (
    <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 5xl:grid-cols-6">
      {artists.map((artist) => (
        <li key={artist.id} className="flex flex-col">
          <Link key={artist.id} href={`/artist/${artist.id}`} className="max-w-max text-white line-clamp-1 hover:underline">
            <Image
              src={artist.images?.[2]?.url || '/images/nocover.webp'}
              alt={artist.name}
              width="0"
              height="0"
              sizes="100vw"
              className="mb-3 h-32 w-32 flex-shrink-0 rounded-full object-cover"
            />
          </Link>

          <Link key={artist.id} href={`/artist/${artist.id}`} className="max-w-max text-white line-clamp-1 hover:underline">
            {artist.name}
          </Link>

          {artist.genres?.[0] && (
            <Link
              key={artist.genres[0]}
              href={`/genre/${artist.genres[0]}`}
              className="max-w-max text-gray-400 line-clamp-1 hover:underline"
            >
              {artist.genres[0]}
            </Link>
          )}

          <Label value={formatFollowCount(artist.followers.total, 1)} icon="heart" />
        </li>
      ))}
    </ul>
  )
}
