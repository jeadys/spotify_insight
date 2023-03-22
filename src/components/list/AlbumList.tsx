'use client'

import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'

import DiscoverButton from '@/components/ui/button/DiscoverButton'
import Label from '@/components/ui/Label'

export default function AlbumList({ albums }: { albums: SpotifyApi.AlbumObjectSimplified[] }) {
  if (!albums?.length) return <DiscoverButton titleMessage="No albums found" buttonMessage="Discover new albums here" />

  return (
    <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 5xl:grid-cols-6">
      {albums.map((album) => (
        <li key={album.id} className="flex flex-col">
          <Link href={`/album/${album.id}`}>
            <Image
              src={album.images?.[1]?.url || '/images/nocover.webp'}
              alt={album.name}
              width="0"
              height="0"
              sizes="100vw"
              className="mb-3 h-32 w-32 flex-shrink-0 rounded-md object-cover"
            />
          </Link>

          <Link href={`/album/${album.id}`} className="max-w-max text-white line-clamp-1 hover:underline">
            {album.name}
          </Link>

          <span className="flex gap-2">
            <Label value={album.total_tracks} icon="music" />
            <Label value={dayjs(album.release_date).year()} />
          </span>
        </li>
      ))}
    </ul>
  )
}
