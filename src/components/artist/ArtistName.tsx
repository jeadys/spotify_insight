import Link from 'next/link'

type Props = {
  artistId: string
  artistName: string
}

export default function ArtistName({ artistId, artistName }: Props) {
  return (
    <Link href={`/artist/${artistId}`} className="max-w-max text-white line-clamp-1 hover:underline">
      {artistName}
    </Link>
  )
}
