'use client'

import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'

import MetadataGrid from '@/components/analysis/MetadataGrid'
import MetadataItem from '@/components/analysis/MetadataItem'
import Header from '@/components/layout/Header'

type Props = {
  album: SpotifyApi.SingleAlbumResponse
}

export default function AlbumHeader({ album }: Props) {
  return (
    <Header>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Image
          src={album.images.length && album.images[0] ? album.images[0].url : '/images/nocover.webp'}
          alt={album.name}
          width="0"
          height="0"
          sizes="100vw"
          className="h-52 w-52 rounded-md object-cover sm:h-60 sm:w-60"
        />

        <div className="capitalize text-white">
          <h2>{album.type}</h2>
          <h1 className="text-3xl font-black sm:text-4xl">{album.name}</h1>
          <Link href={`/artist/${album.artists[0].id}`} className="text-xl text-gray-300 hover:underline">
            {album.artists[0].name}
          </Link>
        </div>
      </div>

      <MetadataGrid>
        <MetadataItem title="Tracks" value={album.total_tracks} />
        <MetadataItem title="Released" value={dayjs(album.release_date).format('DD/MM/YYYY')} />
        <MetadataItem title="Popularity" value={album.popularity} />
      </MetadataGrid>
    </Header>
  )
}
