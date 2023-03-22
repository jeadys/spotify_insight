'use client'

import Image from 'next/image'
import Link from 'next/link'

import MetadataGrid from '@/components/analysis/MetadataGrid'
import MetadataItem from '@/components/analysis/MetadataItem'
import Header from '@/components/layout/Header'
import { formatTrackDuration } from '@/lib/utils'

type Props = {
  track: SpotifyApi.SingleTrackResponse
}
export default function TrackHeader({ track }: Props) {
  return (
    <Header>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Image
          src={track.album.images?.[1]?.url || '/images/nocover.webp'}
          alt={track.name}
          width="0"
          height="0"
          sizes="100vw"
          className="h-52 w-52 rounded-md object-cover sm:h-60 sm:w-60"
        />

        <div className="capitalize text-white">
          <h2>{track.type}</h2>
          <h1 className="text-3xl font-black sm:text-4xl">{track.name}</h1>
          <Link key={track.artists[0].id} href={`/artist/${track.artists[0].id}`} className="text-xl text-gray-300 hover:underline">
            {track.artists[0].name}
          </Link>
        </div>
      </div>

      <MetadataGrid>
        <MetadataItem title="Duration" value={formatTrackDuration(track.duration_ms)} />
        <MetadataItem title="Popularity" value={track.popularity} />
      </MetadataGrid>
    </Header>
  )
}
