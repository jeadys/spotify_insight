import Link from 'next/link'

type Props = {
  trackId: string
  trackName: string
}

export default function TrackName({ trackId, trackName }: Props) {
  return (
    <Link href={`/track/${trackId}`} className="max-w-max text-white line-clamp-1 hover:underline">
      {trackName}
    </Link>
  )
}
