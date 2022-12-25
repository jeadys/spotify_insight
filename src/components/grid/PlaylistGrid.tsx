'use client'

import Image from 'next/image'
import Link from 'next/link'

import DiscoverButton from '@/components/button/DiscoverButton'
import CardGrid from '@/components/card/CardGrid'
import CardItem from '@/components/card/CardItem'
import CardName from '@/components/card/CardName'
import CardStatistic from '@/components/card/CardStatistic'

export default function PlaylistGrid({ playlists }: { playlists: SpotifyApi.PlaylistObjectSimplified[] }) {
  if (!playlists?.length) return <DiscoverButton titleMessage="No playlists found" buttonMessage="Discover new playlists here" />

  return (
    <CardGrid>
      {playlists.map((playlist) => (
        <CardItem key={playlist.id}>
          <Link href={`/playlists/${playlist.id}`} className="flex flex-col items-center">
            <Image
              src={playlist.images.length ? playlist.images[0].url : '/images/nocover.webp'}
              alt={playlist.name}
              width="0"
              height="0"
              sizes="100vw"
              className="mb-5 h-48 w-48 rounded-md object-cover"
            />
            <CardName name={playlist.name} />

            <CardStatistic statistic={playlist.tracks.total < 50 ? `${playlist.tracks.total} Tracks` : '50 Tracks'} />
          </Link>
        </CardItem>
      ))}
    </CardGrid>
  )
}
