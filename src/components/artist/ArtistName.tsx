'use client'

import Link from 'next/link'

type Props = {
  artistId: string
  artistName: string
}

export const ArtistName = ({ artistId, artistName }: Props) => {
  return (
    <Link href={`/artist/${artistId}`} className="line-clamp-1 max-w-max break-all text-white hover:underline">
      {artistName}
    </Link>
  )
}
