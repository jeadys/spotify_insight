'use client'

import Image from 'next/image'
import Link from 'next/link'

import DiscoverButton from '@/components/button/DiscoverButton'
import CardGrid from '@/components/card/CardGrid'
import CardInfo from '@/components/card/CardInfo'
import CardItem from '@/components/card/CardItem'
import CardName from '@/components/card/CardName'
import CardStatistic from '@/components/card/CardStatistic'
import { formatFollowCount } from '@/lib/utils'

export default function ArtistGrid({ artists }: { artists: SpotifyApi.ArtistObjectFull[] }) {
  if (!artists?.length) return <DiscoverButton titleMessage="No artists found" buttonMessage="Discover new artists here" />

  return (
    <CardGrid>
      {artists.map((artist) => (
        <CardItem key={artist.id}>
          <Link href={`/artists/${artist.id}`} className="flex flex-col items-center">
            <Image
              src={artist.images.length && artist.images[2] ? artist.images[2].url : '/images/nocover.webp'}
              alt={artist.name}
              width="0"
              height="0"
              sizes="100vw"
              className="mb-5 h-32 w-32 rounded-full object-cover"
            />
            <CardName name={artist.name} />

            <CardInfo info={artist.genres[0] ? artist.genres[0] : 'N/A'} />

            <CardStatistic statistic={`${formatFollowCount(artist.followers.total, 1)} followers`} />
          </Link>
        </CardItem>
      ))}
    </CardGrid>
  )
}
