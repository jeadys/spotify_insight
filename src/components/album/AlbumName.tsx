import Link from 'next/link'

type Props = {
  albumId: string
  albumName: string
}

export default function AlbumName({ albumId, albumName }: Props) {
  return (
    <Link href={`/album/${albumId}`} className="line-clamp-1 max-w-max break-all text-white hover:underline">
      {albumName}
    </Link>
  )
}
