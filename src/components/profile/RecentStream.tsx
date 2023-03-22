import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import Link from 'next/link'

import { getRecentlyPlayedTracks } from '@/server/api'

dayjs.extend(relativeTime)

export default async function RecentStream() {
  const recentStreams = await getRecentlyPlayedTracks(50)

  return (
    <>
      <table className="w-full">
        <tbody>
          {recentStreams.items.map(({ track, played_at }) => (
            <tr key={track + played_at} className="flex items-center gap-5 p-2 hover:bg-gray-1200">
              <td className="max-w-max flex-shrink-0">
                <Image
                  src={track.album?.images?.[2]?.url || '/images/nocover.webp'}
                  alt={track.name}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="h-10 w-10 rounded-md object-cover"
                />
              </td>
              <td className="flex-grow">
                <Link key={track.id} href={`/track/${track.id}`} className="max-w-max text-white line-clamp-1 hover:underline">
                  {track.name}
                </Link>
                <Link
                  key={track.artists[0].id}
                  href={`/artist/${track.artists[0].id}`}
                  className="max-w-max text-gray-400 line-clamp-1 hover:underline"
                >
                  {track.artists[0].name}
                </Link>
              </td>
              <td>
                <Link
                  key={track.album.id}
                  href={`/album/${track.album.id}`}
                  className="max-w-max text-gray-400 line-clamp-1 hover:underline album:hidden"
                >
                  {track.album.name}
                </Link>
              </td>
              <td>
                <span className="ml-auto text-white duration:hidden">{dayjs(played_at).fromNow()}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
