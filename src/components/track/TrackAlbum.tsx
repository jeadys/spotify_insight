import Link from 'next/link'

type Props = {
  albumId: string
  albumName: string
}

export default function TrackAlbum({ albumId, albumName }: Props) {
  return (
    <Link href={`/album/${albumId}`} className="max-w-max text-gray-400 line-clamp-1 hover:underline album:hidden">
      {albumName}
    </Link>
  )
}
