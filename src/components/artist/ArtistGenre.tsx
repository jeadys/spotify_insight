'use client'

import Link from 'next/link'

type Props = {
  artistGenre: string
}

export const ArtistGenre = ({ artistGenre }: Props) => {
  return (
    <>
      {artistGenre ? (
        <Link href={`/genre/${artistGenre}`} className="line-clamp-1 max-w-max break-all text-gray-400 hover:underline">
          {artistGenre}
        </Link>
      ) : (
        <h4 className="text-gray-400">N/A</h4>
      )}
    </>
  )
}
