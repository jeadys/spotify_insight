import Link from 'next/link'

import { getTopArtists } from '@/server/api'

type Props = {
  timeRange: string
}

export const TopGenre = async ({ timeRange }: Props) => {
  const topArtists = await getTopArtists(timeRange, 12)
  if (!topArtists?.items?.length) return <span className="text-white">No genre associations</span>

  const topGenres = [...new Set(topArtists.items.flatMap((artist) => artist.genres))].slice(0, 12)

  return (
    <ul className="flex flex-wrap gap-5">
      {topGenres.map((genre) => (
        <li key={genre}>
          <Link
            href={`/genre/${genre}`}
            className="line-clamp-1 max-w-max break-all rounded-full bg-gray-1200 px-3 py-2 text-white hover:bg-gray-1100"
          >
            {genre}
          </Link>
        </li>
      ))}
    </ul>
  )
}
