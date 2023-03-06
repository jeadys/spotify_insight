'use client'

import Link from 'next/link'

import DiscoverButton from '@/components/button/DiscoverButton'
import CardGrid from '@/components/card/CardGrid'
import CardItem from '@/components/card/CardItem'

type GenreGridProps = {
  genres: string[]
}

export default function GenreGrid({ genres }: GenreGridProps) {
  if (!genres?.length) return <DiscoverButton titleMessage="No genres found" buttonMessage="Discover new genres here" />

  const uniqueTopGenres = Array.from(new Set(genres)).slice(0, 12)

  return (
    <CardGrid>
      {uniqueTopGenres.map((genre) => (
        <CardItem key={genre}>
          <Link href={`/genres/${genre}`}>
            <span className="block text-white">{genre}</span>
          </Link>
        </CardItem>
      ))}
    </CardGrid>
  )
}
