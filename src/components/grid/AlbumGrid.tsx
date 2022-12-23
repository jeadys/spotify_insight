'use client'

import Image from 'next/image'
import Link from 'next/link'

import DiscoverButton from '@/components/button/DiscoverButton'
import CardGrid from '@/components/card/CardGrid'
import CardInfo from '@/components/card/CardInfo'
import CardItem from '@/components/card/CardItem'
import CardName from '@/components/card/CardName'

export default function AlbumGrid({ albums }: { albums: SpotifyApi.AlbumObjectSimplified[] }) {
  if (!albums?.length) return <DiscoverButton titleMessage="No albums found" buttonMessage="Discover new albums here" />

  return (
    <CardGrid>
      {albums.map((album) => (
        <CardItem key={album.id}>
          <Link href={`/albums/${album.id}`} className="flex flex-col items-center">
            <Image
              src={album.images.length && album.images[1] ? album.images[1].url : '/images/nocover.webp'}
              alt={album.name}
              width="0"
              height="0"
              sizes="100vw"
              className="mx-auto mb-5 h-48 w-48 rounded-md object-cover"
            />

            <CardName name={album.name} />
          </Link>

          <Link href={`/artists/${album.artists[0].id}`} className="hover:underline hover:decoration-white">
            <CardInfo info={album.artists[0].name} />
          </Link>
        </CardItem>
      ))}
    </CardGrid>
  )
}
