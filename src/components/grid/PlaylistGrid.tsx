'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { PlaylistObjectSimplified } from 'spotify-api'

import DiscoverButton from '@/components/button/DiscoverButton'
import CardGrid from '@/components/card/CardGrid'
import CardInfo from '@/components/card/CardInfo'
import CardItem from '@/components/card/CardItem'
import CardName from '@/components/card/CardName'

export default function PlaylistGrid({ playlists }: { playlists: PlaylistObjectSimplified[] }) {
  return (
    <>
      {playlists && playlists.length ? (
        <>
          <ul>
            <CardGrid>
              {playlists.map((playlist) => (
                <li key={playlist.id}>
                  <CardItem>
                    <Link href={`/playlists/${playlist.id}`}>
                      <Image
                        src={playlist.images.length ? playlist.images[0].url : '/images/nocover.webp'}
                        alt={playlist.name}
                        width="0"
                        height="0"
                        sizes="100vw"
                        className="mb-5 h-48 w-48 rounded-md object-cover"
                      />
                      <CardName name={playlist.name} />

                      <CardInfo info={playlist.tracks.total < 50 ? `${playlist.tracks.total} Tracks` : '50 Tracks'} />
                    </Link>
                  </CardItem>
                </li>
              ))}
            </CardGrid>
          </ul>
        </>
      ) : (
        <DiscoverButton titleMessage="No playlists found" buttonMessage="Discover new playlists here" />
      )}
    </>
  )
}
