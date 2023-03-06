'use client'

import Link from 'next/link'

import DiscoverButton from '@/components/button/DiscoverButton'
import CardGrid from '@/components/card/CardGrid'
import CardImage from '@/components/card/CardImage'
import CardInfo from '@/components/card/CardInfo'
import CardItem from '@/components/card/CardItem'
import CardName from '@/components/card/CardName'
import CardStatistic from '@/components/card/CardStatistic'

export default function AlbumGrid({ albums }: { albums: SpotifyApi.AlbumObjectSimplified[] }) {
  if (!albums?.length) return <DiscoverButton titleMessage="No albums found" buttonMessage="Discover new albums here" />
  return (
    <CardGrid>
      {albums.map((album) => (
        <CardItem key={album.id}>
          <Link href={`/albums/${album.id}`} className="flex flex-col items-center gap-2">
            <CardImage imageUrl={(album.images[1] || {}).url} imageAlt={album.name} imageType="album" />

            <CardName name={album.name} />

            <CardStatistic statistic={album.total_tracks < 50 ? `${album.total_tracks} Tracks` : '50 Tracks'} />
          </Link>

          <Link href={`/artists/${album.artists[0].id}`} className="hover:underline hover:decoration-white">
            <CardInfo info={album.artists[0].name} />
          </Link>
        </CardItem>
      ))}
    </CardGrid>
  )
}
