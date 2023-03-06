'use client'

import Link from 'next/link'

import DiscoverButton from '@/components/button/DiscoverButton'
import CardGrid from '@/components/card/CardGrid'
import CardImage from '@/components/card/CardImage'
import CardInfo from '@/components/card/CardInfo'
import CardItem from '@/components/card/CardItem'
import CardName from '@/components/card/CardName'
import CardStatistic from '@/components/card/CardStatistic'
import { formatFollowCount } from '@/lib/utils'

type Props = {
  artists: SpotifyApi.ArtistObjectFull[]
}

export default function ArtistGrid({ artists }: Props) {
  if (!artists?.length) return <DiscoverButton titleMessage="No artists found" buttonMessage="Discover new artists here" />

  return (
    <CardGrid>
      {artists.map((artist) => (
        <CardItem key={artist.id}>
          <Link href={`/artists/${artist.id}`} className="flex flex-col items-center gap-2">
            <CardImage imageUrl={(artist.images[2] || {}).url} imageAlt={artist.name} imageType="artist" rounded />

            <CardName name={artist.name} />

            <CardStatistic statistic={`${formatFollowCount(artist.followers.total, 1)} followers`} />
          </Link>

          <Link href={`/genres/${artist.genres[0]}`} className="hover:underline hover:decoration-white">
            <CardInfo info={artist.genres[0] ? artist.genres[0] : 'N/A'} />
          </Link>
        </CardItem>
      ))}
    </CardGrid>
  )
}
