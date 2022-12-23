'use client'

import Image from 'next/image'

import BioTitle from '@/components/bio/BioTitle'
import BioValue from '@/components/bio/BioValue'
import FollowArtistButton from '@/components/button/FollowArtistButton'
import { formatFollowCount } from '@/lib/utils'

type Props = {
  artist: SpotifyApi.SingleArtistResponse
  isArtistFollowed: boolean
}

export default function ArtistHeader({ artist, isArtistFollowed }: Props) {
  return (
    <header className="text-center">
      <Image
        src={artist.images.length && artist.images[0] ? artist.images[0].url : '/images/nocover.webp'}
        alt={artist.name}
        width="0"
        height="0"
        sizes="100vw"
        className="mx-auto h-96 w-96 rounded-md object-cover"
      />
      <button className="mt-8 h-5">{<FollowArtistButton artistId={artist.id} isArtistFollowed={isArtistFollowed} />}</button>

      <div className="mt-8 text-3xl font-black text-white md:text-6xl lg:text-8xl">{artist.name}</div>

      <div className="mt-8 flex w-full flex-row justify-center gap-x-5 md:gap-x-20">
        {artist.followers && (
          <span>
            <BioValue value={formatFollowCount(artist.followers.total, 1)} />
            <BioTitle title="Followers" />
          </span>
        )}

        {artist.genres && artist.genres[0] && (
          <span>
            <BioValue value={artist.genres[0]} />
            <BioTitle title="Genre" />
          </span>
        )}

        {artist.popularity && (
          <span>
            <BioValue value={` ${artist.popularity}%`} />
            <BioTitle title="Popularity" />
          </span>
        )}
      </div>
    </header>
  )
}
