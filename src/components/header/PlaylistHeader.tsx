'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { SinglePlaylistResponse } from 'spotify-api'

type Props = {
  playlist: SinglePlaylistResponse
}

export default function PlaylistHeader({ playlist }: Props) {
  return (
    <div className="mt-5">
      <Image
        src={playlist.images.length && playlist.images[0] ? playlist.images[0].url : '/images/nocover.webp'}
        alt={playlist.name}
        width="0"
        height="0"
        sizes="100vw"
        className="mx-auto h-80 w-80 rounded-md object-cover"
      />

      <div className="mx mt-5 flex flex-col items-center gap-y-2">
        <div className="text-2xl font-black text-white md:text-4xl">{playlist.name}</div>

        <span className="text-sm text-slate-400">By {playlist.owner.display_name}</span>

        <div className="text-sm font-semibold text-white">{playlist.tracks.total < 50 ? playlist.tracks.total : '50'} Tracks</div>

        {playlist.tracks.total >= 5 && (
          <Link href={`/recommendations/${playlist.id}`} className="my-5 rounded-md bg-blue-600 py-2 px-5 text-white">
            Get recommendations
          </Link>
        )}
      </div>
    </div>
  )
}