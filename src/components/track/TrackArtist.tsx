'use client'

import Link from 'next/link'

type Props = {
  artistId: string
  artistName: string
}

export const TrackArtist = ({ artistId, artistName }: Props) => {
  return (
    <Link key={artistId} href={`/artist/${artistId}`} className="line-clamp-1 max-w-max break-all text-gray-400 hover:underline">
      {artistName}
    </Link>
  )
}
