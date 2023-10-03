import React from 'react'

import Image from 'next/image'

import PlaybackHandle from '@/components/playback/PlaybackHandle'
import TrackArtist from '@/components/track/TrackArtist'
import TrackDuration from '@/components/track/TrackDuration'
import TrackName from '@/components/track/TrackName'
import { getPlaylistTracks } from '@/server/api'

type Props = {
  playlistId: string
}

export default async function PlaylistTrackList({ playlistId }: Props) {
  const playlistTracks = await getPlaylistTracks(playlistId, 100)
  if (!playlistTracks?.items?.length) return <span className="text-white">No tracks found</span>

  type Acc = {
    uris: string[]
    ids: string[]
  }

  const { uris, ids } = playlistTracks.items.reduce(
    (acc: Acc, { track }) => {
      if (track) {
        acc.uris.push(track.uri)
        acc.ids.push(track.id)
      }
      return acc
    },
    { uris: [], ids: [] }
  )

  return (
    <ul className="w-full">
      {playlistTracks.items.map(({ track }) => (
        <li key={track.id} className="group flex items-center gap-5 p-2 hover:bg-gray-1200">
          <div className="relative flex flex-shrink-0 items-center justify-center">
            <Image
              src={track.album?.images?.[2]?.url || '/images/nocover.webp'}
              alt={track.name}
              width="0"
              height="0"
              sizes="100vw"
              className="h-10 w-10 rounded-md object-cover group-hover:blur-xs"
            />

            <PlaybackHandle uri={track.uri} queue={uris} />
          </div>

          <span className="flex-grow">
            <TrackName trackId={track.id} trackName={track.name} />
            <TrackArtist artistId={track.artists[0].id} artistName={track.artists[0].name} />
          </span>

          <TrackDuration trackDuration={track.duration_ms} />
        </li>
      ))}
    </ul>
  )
}
