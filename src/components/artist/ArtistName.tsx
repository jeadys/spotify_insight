import Link from 'next/link'

type Props = {
  artistId: string
  artistName: string
}

export default function ArtistName({ artistId, artistName }: Props) {
  return (
    <Link href={`/artist/${artistId}`} className="line-clamp-1 max-w-max text-white hover:underline">
      {artistName}
    </Link>
  )
}
