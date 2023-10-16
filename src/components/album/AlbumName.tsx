'use client'

import Link from 'next/link'

type Props = {
  albumId: string
  albumName: string
}

export const AlbumName = ({ albumId, albumName }: Props) => {
  return (
    <Link href={`/album/${albumId}`} className="line-clamp-1 max-w-max break-all text-white hover:underline">
      {albumName}
    </Link>
  )
}
