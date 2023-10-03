import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'

import MetadataGrid from '@/components/analysis/MetadataGrid'
import MetadataItem from '@/components/analysis/MetadataItem'
import Header from '@/components/layout/Header'
import { getAlbumById } from '@/server/api'

type Props = {
  albumId: string
}

export default async function AlbumHeader({ albumId }: Props) {
  const album = await getAlbumById(albumId)

  return (
    <Header>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Image
          src={album.images?.[1]?.url || '/images/nocover.webp'}
          alt={album.name}
          width="0"
          height="0"
          sizes="100vw"
          priority={true}
          className="h-52 w-52 rounded-md object-cover sm:h-60 sm:w-60"
        />

        <div className="capitalize text-white">
          <h2>{album.type}</h2>
          <h1 className="text-3xl font-black sm:text-4xl">{album.name}</h1>
          <Link href={`/artist/${album.artists[0].id}`} className="text-xl text-gray-300 hover:underline">
            {album.artists[0].name}
          </Link>
          <Link href={album.external_urls.spotify} target="_blank" className="block max-w-max">
            <Image src="/icons/spotify.svg" alt="Spotify" width="0" height="0" sizes="100vw" className="mt-2 h-6 w-6" />
          </Link>
        </div>
      </div>

      <MetadataGrid>
        <MetadataItem title="Released" value={dayjs(album.release_date).format('MMMM DD, YYYY')} />
        <MetadataItem title="Tracks" value={album.total_tracks} />
        <MetadataItem title="Popularity" value={album.popularity / 10} />
      </MetadataGrid>
    </Header>
  )
}
