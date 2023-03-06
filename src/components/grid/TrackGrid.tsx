'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import DiscoverButton from '@/components/button/DiscoverButton'
import SaveTrackButton from '@/components/button/SaveTrackButton'
import MusicBar from '@/components/core/MusicBar'
import { formatTrackDuration, stopProp } from '@/lib/utils'
import { ChooseTrack, PlayTrack } from '@/providers/PlayedTrackProvider'

type Props = {
  tracks: SpotifyApi.TrackObjectSimplified[]
}

export default function TrackGrid({ tracks }: Props) {
  if (!tracks?.length) return <DiscoverButton titleMessage="No tracks found" buttonMessage="Discover new tracks here" />

  const trackUris = tracks.map((track) => track.uri)
  const playingTrack = PlayTrack()
  const chosenTrack = ChooseTrack()

  return (
    <table className="w-full text-white">
      <tbody>
        {tracks.map((track, index) => (
          <tr
            key={track.id}
            onClick={() => chosenTrack(trackUris, track.uri)}
            className={clsx(playingTrack === track.uri ? 'bg-sky-600' : 'cursor-pointer hover:bg-slate-700')}
          >
            <td className="py-4">
              <div className="flex items-center">
                <div className="w-7 text-center">{playingTrack === track.uri ? <MusicBar /> : index + 1}</div>
                {track.album && (
                  <div className="h-10 w-10 flex-shrink-0">
                    <Image
                      src={track.album.images.length && track.album.images[2] ? track.album.images[2].url : '/images/nocover.webp'}
                      alt={track.name}
                      width="0"
                      height="0"
                      sizes="100vw"
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  </div>
                )}

                <div className="ml-4">
                  <div className="text-base font-semibold">
                    {track.name.length <= 20 ? track.name : track.name.slice(0, 20).concat('...')}
                  </div>

                  {track.artists.slice(0, 3).map<React.ReactNode>((artist, index) => [
                    ...(index ? [', '] : []),

                    <Link
                      key={artist.id}
                      href={`/artists/${artist.id}`}
                      onClick={stopProp}
                      className="text-sm text-gray-300 hover:underline"
                    >
                      {artist.name}
                    </Link>,
                  ])}
                </div>
              </div>
            </td>

            {track.album && (
              <td className="px-3 py-4 album:hidden">
                <Link href={`/albums/${track.album.id}`} onClick={stopProp} className="text-sm text-gray-300 hover:underline">
                  {track.album.name.length <= 20 ? track.album.name : track.album.name.slice(0, 20).concat('...')}
                </Link>
              </td>
            )}

            <td className="w-0 px-3 py-4 duration:hidden">
              <span className="text-sm">{formatTrackDuration(track.duration_ms)}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
