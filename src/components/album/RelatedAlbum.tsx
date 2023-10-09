import { getTrackById } from '@/server/api'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import Label from '../ui/Label'

type Props = {
  trackId: string
}
export default async function RelatedAlbum({ trackId }: Props) {
  const track = await getTrackById(trackId)

  return (
    <div className="flex max-w-max flex-row items-center gap-5 sm:flex-col sm:items-start">
      <Link href={`/album/${track.album.id}`} className="flex-shrink-0">
        <Image
          src={track.album.images?.[1]?.url || '/images/nocover.webp'}
          alt={track.album.name}
          width="0"
          height="0"
          sizes="100vw"
          className="h-24 w-24 rounded-md object-cover sm:h-32 sm:w-32"
        />
      </Link>

      <span className="sm:flex sm:flex-col">
        <Link href={`/album/${track.album.id}`} className="line-clamp-1 max-w-max break-all text-white hover:underline">
          {track.album.name}
        </Link>

        <span className="flex flex-row">
          <Label value={track.album.total_tracks} icon="music" />
          <Label value={dayjs(track.album.release_date).year()} />
        </span>
      </span>
    </div>
  )
}
