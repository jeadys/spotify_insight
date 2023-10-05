import Image from 'next/image'
import Link from 'next/link'

import MetadataGrid from '@/components/analysis/MetadataGrid'
import MetadataItem from '@/components/analysis/MetadataItem'
import Header from '@/components/layout/Header'
import { getPlaylistById } from '@/server/api'

type Props = {
  playlistId: string
}

export default async function AlbumHeader({ playlistId }: Props) {
  const playlist = await getPlaylistById(playlistId)

  return (
    <Header>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Image
          src={playlist.images?.[1]?.url || playlist.images?.[0]?.url || '/images/nocover.webp'}
          alt={playlist.name}
          width="0"
          height="0"
          sizes="100vw"
          priority={true}
          className="h-52 w-52 rounded-md object-cover sm:h-60 sm:w-60"
        />

        <div className="capitalize text-white">
          <h2>{playlist.type}</h2>
          <h1 className="line-clamp-1 break-all text-3xl font-black sm:text-4xl">{playlist.name}</h1>
          <Link href={playlist.owner.external_urls.spotify} className="line-clamp-1 break-all text-xl text-gray-300 hover:underline">
            {playlist.owner.display_name}
          </Link>
          <Link href={playlist.external_urls.spotify} target="_blank" className="block max-w-max">
            <Image src="/icons/spotify.svg" alt="Spotify" width="0" height="0" sizes="100vw" className="mt-2 h-6 w-6" />
          </Link>
        </div>
      </div>

      <MetadataGrid>
        <MetadataItem title="Tracks" value={playlist.tracks.total} />
      </MetadataGrid>
    </Header>
  )
}
