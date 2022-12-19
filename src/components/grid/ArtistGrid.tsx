'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { ArtistObjectFull } from 'spotify-api'

import DiscoverButton from '@/components/button/DiscoverButton'
import CardGrid from '@/components/card/CardGrid'
import CardInfo from '@/components/card/CardInfo'
import CardItem from '@/components/card/CardItem'
import CardName from '@/components/card/CardName'
import { formatFollowCount } from '@/lib/utils'

export default function ArtistGrid({ artists }: { artists: ArtistObjectFull[] }) {
  return (
    <>
      {artists && artists.length ? (
        <>
          <ul>
            <CardGrid>
              {artists.map((artist) => (
                <li key={artist.id}>
                  <Link href={`/artists/${artist.id}`}>
                    <CardItem>
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

                      <span className="mt-5 hidden rounded-md bg-cyan-100 px-2 py-1 text-xs font-medium sm:block">
                        {formatFollowCount(artist.followers.total, 1)} followers
                      </span>
                    </CardItem>
                  </Link>
                </li>
              ))}
            </CardGrid>
          </ul>
        </>
      ) : (
        <DiscoverButton titleMessage="No artists found" buttonMessage="Discover new artists here" />
      )}
    </>
  )
}
