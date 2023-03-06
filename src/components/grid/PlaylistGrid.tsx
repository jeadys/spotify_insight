'use client'

import Link from 'next/link'

import DiscoverButton from '@/components/button/DiscoverButton'
import CardGrid from '@/components/card/CardGrid'
import CardImage from '@/components/card/CardImage'
import CardItem from '@/components/card/CardItem'
import CardName from '@/components/card/CardName'
import CardStatistic from '@/components/card/CardStatistic'

export default function PlaylistGrid({ playlists }: { playlists: SpotifyApi.PlaylistObjectSimplified[] }) {
  if (!playlists?.length) return <DiscoverButton titleMessage="No playlists found" buttonMessage="Discover new playlists here" />

  return (
    <CardGrid>
      {playlists.map((playlist) => (
        <CardItem key={playlist.id}>
          <Link href={`/playlists/${playlist.id}`} className="flex flex-col items-center gap-2">
            <CardImage imageUrl={(playlist.images[0] || {}).url} imageAlt={playlist.name} imageType="playlist" />

            <CardName name={playlist.name} />

            <CardStatistic statistic={playlist.tracks.total < 50 ? `${playlist.tracks.total} Tracks` : '50 Tracks'} />
          </Link>
        </CardItem>
      ))}
    </CardGrid>
  )
}
