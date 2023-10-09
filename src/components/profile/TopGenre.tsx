'use client'

import Link from 'next/link'

import useTopArtists from '@/hooks/query/useTopArtists'

export default function TopGenre() {
  const topArtists = useTopArtists()
  if (!topArtists?.items?.length) return <span className="text-white">No genre associations</span>

  const topGenres = [...new Set(topArtists.items.flatMap((artist) => artist.genres))].slice(0, 12)

  return (
    <div className="flex flex-wrap gap-5">
      {topGenres.map((genre) => (
        <Link
          key={genre}
          href={`/genre/${genre}`}
          className="line-clamp-1 max-w-max break-all rounded-full bg-gray-1200 px-3 py-2 text-white hover:bg-gray-1100"
        >
          {genre}
        </Link>
      ))}
    </div>
  )
}
