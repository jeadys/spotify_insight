import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'

import type { ITracks } from '../../lib/interfaces/tracks'
import { getDoesUserHaveTrackSaved } from '../../lib/spotify'
import { formatDuration, stopProp } from '../../lib/utils'
import { SaveTrackButton } from '../button'
import DiscoverButton from '../button/DiscoverButton'
import { MusicBar } from '../core'
import { ChooseTrack, PlayTrack } from '../core/TrackContext'

export default function TrackGrid({ items }: ITracks) {
  const trackIds = useMemo(() => {
    return items.map((track) => track.id).join(',')
  }, [items])

  const trackUris = useMemo(() => {
    return items.map((track) => track.uri)
  }, [items])

  const playingTrack = PlayTrack()
  const chooseTrack = ChooseTrack()
  const { asPath } = useRouter()

  const fetchDoesUserHaveTrackSaved = async () => {
    const isTrackSaved = await getDoesUserHaveTrackSaved(trackIds)
    return isTrackSaved.data
  }

  const { data: isTrackSaved } = useQuery(['is-track-saved', asPath], fetchDoesUserHaveTrackSaved, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  return (
    <>
      {items && items.length ? (
        <>
          <table className="w-full text-white">
            <tbody className="">
              {items.map((track, index) => (
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
                          <img
                            src={track.album.images.length && track.album.images[2] ? track.album.images[2].url : '/images/nocover.webp'}
                            className="h-10 w-10 rounded-md object-cover"
                            alt={track.name}
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

                                {index < track.album!.artists.length - 1 ? ', ' : ''}
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
                    {isTrackSaved && (
                      <span onClick={(e) => stopProp(e)}>
                        <SaveTrackButton id={track.id} saved={isTrackSaved[index]} />
                      </span>
                    )}
                  </td>
                  <td className="w-0 px-3 py-4 text-sm duration:hidden">
                    <span>{formatDuration(track.duration_ms)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <DiscoverButton titleMessage="No tracks found" buttonMessage="Discover new tracks" />
      )}
    </>
  )
}
