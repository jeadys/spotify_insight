'use client'

import Image from 'next/image'

import BioTitle from '@/components/bio/BioTitle'
import BioValue from '@/components/bio/BioValue'
import SaveAlbumButton from '@/components/button/SaveAlbumButton'
import { getYear } from '@/lib/utils'

type Props = {
  album: SpotifyApi.SingleAlbumResponse
  isAlbumSaved: boolean
}

export default function AlbumHeader({ album, isAlbumSaved }: Props) {
  return (
    <div className="mt-5">
      <Image
        src={album.images.length && album.images[0] ? album.images[0].url : '/images/nocover.webp'}
        alt={album.name}
        width="0"
        height="0"
        sizes="100vw"
        className="mx-auto h-80 w-80 rounded-md object-cover"
      />

      <div className="mx mt-5 flex flex-col items-center gap-y-2">
        <div className="text-2xl font-black text-white md:text-4xl">{album.name}</div>

        <span className="text-sm text-slate-400">Released in {getYear(album.release_date)}</span>

        <div className="text-sm font-semibold text-white">{album.tracks.total < 50 ? album.tracks.total : '50'} Tracks</div>

        <div className="h-5">
          <SaveAlbumButton albumId={album.id} isAlbumSaved={isAlbumSaved} />
        </div>

        <div className="my-5">
          <BioValue value={` ${album.popularity} %`} />
          <BioTitle title="Popularity" />
        </div>
      </div>
    </div>
  )
}
