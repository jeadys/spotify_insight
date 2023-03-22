'use client'

import Image from 'next/image'
import Link from 'next/link'

import DiscoverButton from '@/components/ui/button/DiscoverButton'
import { formatTrackDuration } from '@/lib/utils'

type Props = {
  tracks: SpotifyApi.TrackObjectSimplified[]
  cover?: string
}

export default function TrackList({ tracks, cover }: Props) {
  if (!tracks?.length) return <DiscoverButton titleMessage="No tracks found" buttonMessage="Discover new tracks here" />

  return (
    <>
      <table className="w-full">
        <tbody>
          {tracks.map((track) => (
            <tr key={track.id} className="group flex items-center gap-5 p-2 hover:bg-gray-1200">
              <td className="flex-shrink-0">
                <div className="relative flex items-center justify-center">
                  <Image
                    src={track.album?.images?.[2]?.url || cover || '/images/nocover.webp'}
                    alt={track.name}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="h-10 w-10 rounded-md object-cover"
                  />
                </div>
              </td>

              <td className="flex-grow">
                <Link href={`/track/${track.id}`} className="max-w-max text-white line-clamp-1 hover:underline">
                  {track.name}
                </Link>

                {track.artists?.[0]?.id && (
                  <Link
                    key={track.artists[0].id}
                    href={`/artist/${track.artists[0].id}`}
                    className="max-w-max text-sm text-gray-400 line-clamp-1 hover:underline"
                  >
                    {track.artists[0].name}
                  </Link>
                )}
              </td>

              {track.album && (
                <td>
                  <Link
                    href={`/album/${track.album.id}`}
                    className="max-w-max text-sm text-gray-400 line-clamp-1 hover:underline album:hidden"
                  >
                    {track.album.name}
                  </Link>
                </td>
              )}
              <td>
                <span className="ml-auto text-white duration:hidden">{formatTrackDuration(track.duration_ms)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
