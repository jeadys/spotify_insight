import Link from 'next/link'

type Props = {
  artistId: string
  artistName: string
}

export default function TrackArtist({ artistId, artistName }: Props) {
  return (
    <Link key={artistId} href={`/artist/${artistId}`} className="line-clamp-1 max-w-max text-gray-400 hover:underline">
      {artistName}
    </Link>
  )
}
