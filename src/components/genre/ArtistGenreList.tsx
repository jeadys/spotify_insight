import Link from 'next/link'

import { getArtistById } from '@/server/api'

type Props = {
  artistId: string
}

export default async function ArtistGenreList({ artistId }: Props) {
  const artist = await getArtistById(artistId)
  if (!artist?.genres?.length) return <span className="text-white">No genre associations</span>

  return (
    <div className="flex flex-wrap gap-5">
      {artist.genres.map((genre) => (
        <Link
          key={genre}
          href={`/genre/${genre}`}
          className="line-clamp-1 max-w-max rounded-full bg-gray-1200 px-3 py-2 text-white hover:bg-gray-1100"
        >
          {genre}
        </Link>
      ))}
    </div>
  )
}
