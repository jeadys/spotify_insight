'use client'

import Link from 'next/link'

type Props = {
  playlistId: string
  playlistName: string
}

export const PlaylistName = ({ playlistId, playlistName }: Props) => {
  return (
    <Link href={`/playlist/${playlistId}`} className="line-clamp-1 max-w-max break-all text-white hover:underline">
      {playlistName}
    </Link>
  )
}
