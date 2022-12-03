'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

import type { IArtistHeader } from '../../lib/interfaces/artist-header'
import { getDoesUserFollowArtist } from '../../lib/spotify'
import BioTitle from '../bio/BioTitle'
import BioValue from '../bio/BioValue'
import { FollowArtistButton } from '../button'

export default function ArtistHeader({ data }: IArtistHeader) {
  const fetchDoesUserFollowArtist = async () => {
    const isArtistFollowed = await getDoesUserFollowArtist(data.id)
    return isArtistFollowed.data
  }

  const { data: isArtistFollowed } = useQuery(['is-artist-followed', data.id], fetchDoesUserFollowArtist, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  return (
    <div className="text-center">
      <Image
        src={data.images.length && data.images[0] ? data.images[0].url : '/images/nocover.webp'}
        alt={data.name}
        width="0"
        height="0"
        sizes="100vw"
        className="mx-auto h-96 w-96 rounded-md object-cover"
      />
      <div className="mt-8 text-3xl font-black text-white md:text-6xl lg:text-8xl">{data.name}</div>

      <div className="mt-8 h-5">{isArtistFollowed && <FollowArtistButton id={data.id} followed={isArtistFollowed[0]} />}</div>

      <div className="mt-8 flex w-full flex-row justify-center gap-x-5 md:gap-x-20">
        {data.followers && (
          <div>
            <BioValue value={data.followers.total.toLocaleString()} />
            <BioTitle title="Followers" />
          </div>
        )}

        {data.genres && data.genres[0] && (
          <div>
            <BioValue value={data.genres[0]} />
            <BioTitle title="Genres" />
          </div>
        )}

        {data.popularity && (
          <div>
            <BioValue value={` ${data.popularity.toString()} %`} />
            <BioTitle title="Popularity" />
          </div>
        )}
      </div>
    </div>
  )
}
