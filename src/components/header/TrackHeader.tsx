'use client'

import Image from 'next/image'
import Link from 'next/link'

import MetadataGrid from '@/components/analysis/MetadataGrid'
import MetadataItem from '@/components/analysis/MetadataItem'
import Header from '@/components/layout/Header'
import { formatTrackDuration } from '@/utils/formatTrackDuration'

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
          priority={true}
          className="h-52 w-52 rounded-md object-cover sm:h-60 sm:w-60"
        />

        <div className="capitalize text-white">
          <h2>{track.type}</h2>
          <h1 className="line-clamp-1 break-all text-3xl font-black sm:text-4xl">{track.name}</h1>
          <Link href={`/artist/${track.artists[0].id}`} className="line-clamp-1 break-all text-xl text-gray-300 hover:underline">
            {track.artists[0].name}
          </Link>
          <Link href={track.external_urls.spotify} target="_blank" className="block max-w-max">
            <Image src="/icons/spotify.svg" alt="Spotify" width="0" height="0" sizes="100vw" className="mt-2 h-6 w-6" />
          </Link>
        </div>
      </div>

      <MetadataGrid>
        <MetadataItem title="Duration" value={formatTrackDuration(track.duration_ms)} />
        <MetadataItem title="Popularity" value={track.popularity / 10} />
      </MetadataGrid>
    </Header>
  )
}
