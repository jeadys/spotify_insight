'use client'

import { useMemo } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import type { TrackObjectSimplified } from 'spotify-api'

import DiscoverButton from '@/components/button/DiscoverButton'
import SaveTrackButton from '@/components/button/SaveTrackButton'
import MusicBar from '@/components/core/MusicBar'
import { formatTrackDuration, stopProp } from '@/lib/utils'
import { ChooseTrack, PlayTrack } from '@/providers/PlayedTrackProvider'

type Props = {
  tracks: TrackObjectSimplified[]
  isTrackSaved: boolean[]
}

export default function TrackGrid({ tracks, isTrackSaved }: Props) {
  const trackUris = useMemo(() => {
    return tracks.map((track) => track.uri)
  }, [tracks])

  const playingTrack = PlayTrack()
  const chooseTrack = ChooseTrack()

  return (
    <>
      {tracks && tracks.length ? (
        <>
          <table className="w-full text-white">
            <tbody className="">
              {tracks.map((track, index) => (
                <tr
                  key={track.id}
                  className={`${playingTrack === track.uri ? 'bg-sky-600' : 'cursor-pointer hover:bg-slate-700'}`}
                  onClick={() => chooseTrack(trackUris, track.uri)}
                >
                  <td className="py-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-7 text-center">{playingTrack === track.uri ? <MusicBar /> : <span>{index + 1}</span>}</div>
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
                        <div className="font-semibold">
                          {track.name.length < 20 ? <> {track.name}</> : <>{track.name.slice(0, 20).concat('...')}</>}
                        </div>
                        {track.album ? (
                          <>
                            {track.album.artists.map((artist, index) => (
                              <span key={artist.id} className="text-xs text-gray-300 hover:underline">
                                <Link href={`/artists/${artist.id}`} onClick={(e) => stopProp(e)}>
                                  {artist.name}
                                </Link>

                                {index < track.album.artists.length - 1 ? ', ' : ''}
                              </span>
                            ))}
                          </>
                        ) : (
                          <>
                            {track.artists.map((artist, index) => (
                              <span key={artist.id} className="text-xs text-gray-300 hover:underline">
                                <Link href={`/artists/${artist.id}`} onClick={(e) => stopProp(e)}>
                                  {artist.name}
                                </Link>

                                {index < track.artists.length - 1 ? ', ' : ''}
                              </span>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                  {track.album && (
                    <td className="px-3 py-4 text-sm text-gray-300 album:hidden">
                      <span className="text-xs text-gray-300 hover:underline">
                        <Link href={`/albums/${track.album.id}`} onClick={(e) => stopProp(e)}>
                          {track.album.name.length < 20 ? <> {track.album.name}</> : <>{track.album.name.slice(0, 20).concat('...')}</>}
                        </Link>
                      </span>
                    </td>
                  )}
                  <td className="w-0 px-3 py-4 text-sm">
                    <span onClick={(e) => stopProp(e)}>
                      <SaveTrackButton trackId={track.id} isTrackSaved={isTrackSaved[index]} />
                    </span>
                  </td>
                  <td className="w-0 px-3 py-4 text-sm duration:hidden">
                    <span>{formatTrackDuration(track.duration_ms)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <DiscoverButton titleMessage="No tracks found" buttonMessage="Discover new tracks here" />
      )}
    </>
  )
}
