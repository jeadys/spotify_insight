import Link from 'next/link'

type Props = {
  artistId: string
  artistName: string
}

export default function TrackArtist({ artistId, artistName }: Props) {
  return (
    <Link key={artistId} href={`/artist/${artistId}`} className="max-w-max text-gray-400 line-clamp-1 hover:underline">
      {artistName}
    </Link>
  )
}
