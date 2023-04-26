import Link from 'next/link'

type Props = {
  albumId: string
  albumName: string
}

export default function AlbumName({ albumId, albumName }: Props) {
  return (
    <Link href={`/album/${albumId}`} className="max-w-max text-white line-clamp-1 hover:underline">
      {albumName}
    </Link>
  )
}
