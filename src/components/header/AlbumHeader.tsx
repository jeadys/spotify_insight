'use client'

import Image from 'next/image'

import BioTitle from '@/components/bio/BioTitle'
import BioValue from '@/components/bio/BioValue'
import { getYear } from '@/lib/utils'

type Props = {
  album: SpotifyApi.SingleAlbumResponse
}

export default function AlbumHeader({ album }: Props) {
  return (
    <header className="mt-5">
      <Image
        src={album.images.length && album.images[0] ? album.images[0].url : '/images/nocover.webp'}
        alt={album.name}
        width="0"
        height="0"
        sizes="100vw"
        className="mx-auto h-80 w-80 rounded-md object-cover"
      />

      <div className="mx mt-5 flex flex-col items-center gap-y-2">
        <span className="text-2xl font-black text-white md:text-4xl">{album.name}</span>
        <span className="text-sm text-slate-400">Released in {getYear(album.release_date)}</span>
        <span className="text-sm font-semibold text-white">{album.tracks.total < 50 ? album.tracks.total : '50'} Tracks</span>

        <BioValue value={` ${album.popularity} %`} />
        <BioTitle title="Popularity" />
      </div>
    </header>
  )
}
