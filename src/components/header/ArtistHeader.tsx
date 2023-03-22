'use client'

import Image from 'next/image'

import MetadataGrid from '@/components/analysis/MetadataGrid'
import MetadataItem from '@/components/analysis/MetadataItem'
import Header from '@/components/layout/Header'

type Props = {
  artist: SpotifyApi.SingleArtistResponse
}
export default function ArtistHeader({ artist }: Props) {
  return (
    <Header>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Image
          src={artist.images?.[1]?.url || '/images/nocover.webp'}
          alt={artist.name}
          width="0"
          height="0"
          sizes="100vw"
          className="h-52 w-52 flex-grow-0 rounded-full object-cover sm:h-60 sm:w-60"
        />

        <div className="capitalize text-white">
          <h2>{artist.type}</h2>
          <h1 className="text-3xl font-black sm:text-4xl">{artist.name}</h1>
        </div>
      </div>

      <MetadataGrid>
        <MetadataItem title="Followers" value={artist.followers.total.toLocaleString()} />
        <MetadataItem title="Popularity" value={artist.popularity / 10} />
      </MetadataGrid>
    </Header>
  )
}
