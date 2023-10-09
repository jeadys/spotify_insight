import Link from 'next/link'

type Props = {
  trackId: string
  trackName: string
}

export default function TrackName({ trackId, trackName }: Props) {
  return (
    <Link href={`/track/${trackId}`} className="line-clamp-1 max-w-max break-all text-white hover:underline">
      {trackName}
    </Link>
  )
}
